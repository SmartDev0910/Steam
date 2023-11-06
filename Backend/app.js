const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const sanitizer = require("express-sanitizer");
const MongoStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const cors = require("cors");
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const DiscordStrategy = require("passport-discord").Strategy;
const jwt = require("jsonwebtoken");
const multer = require("multer");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const {
  DB_URL,
  SESSION_SECRET,
  BACKEND_PORT,
  STEAM_API_KEY,
  FRONT_END_URL,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  BACKEND_ROOTURL,
} = require("./config");

const loginRoutes = require("./routes/loginRoutes");
const roleRoutes = require("./routes/roleRoutes");
const memberRoutes = require("./routes/memberRoutes");
const applicationTypeRoutes = require("./routes/applicationTypeRoutes");
const changelogRoutes = require("./routes/changelogRoutes");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static("./uploads"));

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitizer());

// db config
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log(error));

//PASSPORT CONFIGURATION

const store = new MongoStore({
  uri: DB_URL,
  collection: "sessions",
});

// Required to get data from user for sessions
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Initiate Strategy
passport.use(
  new SteamStrategy(
    {
      returnURL: BACKEND_ROOTURL + "/api/auth/steam/return",
      realm: BACKEND_ROOTURL + "/",
      apiKey: STEAM_API_KEY,
    },
    function (identifier, profile, done) {
      process.nextTick(function () {
        profile.identifier = identifier;
        return done(null, profile);
      });
    }
  )
);

passport.use(
  new DiscordStrategy(
    {
      clientID: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      callbackURL: BACKEND_ROOTURL + "/api/auth/discord/redirect",
      scope: ["identify", "guilds"],
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile); // Log full profile for now
      return cb(null, profile);
    }
  )
);

app.use(
  session({
    //must be declared before passport session and initialize method
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store,
  })
);

app.use(flash());

app.use(passport.initialize()); //must declared before passport.session()
app.use(passport.session());

app.get("/api/heartbeat", (req, res) => res.send("Hello World!"));

// Steam Routes
app.get(
  "/api/auth/steam",
  passport.authenticate("steam", { failureRedirect: "/failed" }),
  function (req, res) {
    res.send(req.user);
  }
);

app.get(
  "/api/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/failed" }),
  function (req, res) {
    res.redirect(
      `${FRONT_END_URL}/profile-settings?steam64=${req.user._json.steamid}`
    );
  }
);

// Discord Routes

app.get("/api/auth/discord", passport.authenticate("discord"));

app.get(
  "/api/auth/discord/redirect",
  passport.authenticate("discord", { failureRedirect: "/failed" }),
  function (req, res) {
    res.redirect(`${FRONT_END_URL}/profile-settings?discordID=${req.user.id}`); // Redirect to frontend after successful login
  }
);

app.get("/failed", (req, res) => res.send("You failed to log in!"));

const storage = multer.diskStorage({
  destination: "uploads/audio",
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".wav");
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  // Handle the uploaded file here
  const file = req.file;

  // Send a response back to the client
  res.status(200).send(file);
});

//jwt middleware
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerHeader;

    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}

//Routes
app.use("/api/auth", loginRoutes);
app.use("/api/roles", verifyToken, roleRoutes);
app.use("/api/members", verifyToken, memberRoutes);
app.use("/api/application_types", verifyToken, applicationTypeRoutes);
// app.use("/api", verifyToken, changelogRoutes);

const port = BACKEND_PORT || 8080;

app.listen(port, () =>
  console.log(`CircuitRP service is running on port ${port}!`)
);
