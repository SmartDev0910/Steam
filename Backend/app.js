const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const sanitizer = require("express-sanitizer");
const MongoStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const cors = require("cors");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const { DB_URL, SESSION_SECRET, PORT } = require("./config");

const userRoutes = require("./routes/userRoutes");
const clubRoutes = require("./routes/clubRoutes");
const fanRoutes = require("./routes/fanRoutes");
const foodRoutes = require("./routes/foodRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const videoRoutes = require("./routes/videoRoutes");
const sponsorRoutes = require("./routes/sponsorRoutes");
const shopRoutes = require("./routes/shopRoutes");
const marketplaceRoutes = require("./routes/marketplaceRoutes");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

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

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.warning = req.flash("warning");
  next();
});

app.get("/test", (req, res) => res.send("Hello World!"));

const storage = multer.diskStorage({
  destination: "uploads/video",
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".mp4");
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },
});

app.post("/upload", upload.single("file"), (req, res) => {
  // Handle the uploaded file here
  const file = req.file;

  // Send a response back to the client
  res.status(200).send({ status: 200, data: file });
});

const uploadLogo = multer({ dest: "uploads/logo" });

app.post("/upload/logo", uploadLogo.single("logo"), (req, res) => {
  // Handle the uploaded file here
  const file = req.file;

  // Send a response back to the client
  res.status(200).send({ status: 200, data: file });
});

const uploadLogoMarketplace = multer({ dest: "uploads/marketplace" });

app.post(
  "/upload/logo/marketplace",
  uploadLogoMarketplace.single("marketplace"),
  (req, res) => {
    // Handle the uploaded file here
    const file = req.file;

    // Send a response back to the client
    res.status(200).send({ status: 200, data: file });
  }
);

//Routes
app.use(userRoutes);
app.use(clubRoutes);
app.use(fanRoutes);
app.use(foodRoutes);
app.use(ticketRoutes);
app.use(videoRoutes);
app.use(sponsorRoutes);
app.use(shopRoutes);
app.use(marketplaceRoutes);

const port = PORT || 8080;

app.listen(port, () =>
  console.log(`API WAVE PLUS APP is running on port ${port}!`)
);
