// importing models
const User = require("../models/user");
const md5 = require("md5");

// user -> test
exports.test = (req, res, next) => {
  res.send("User Controller Running Successfully!");
};

// user -> SignIn
exports.SignIn = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((result) => {
      if (result) {
        if (result.password !== md5(req.body.password))
          res.status(401).send({ status: 401, data: "Password is incorrect" });
        else res.status(200).send({ status: 200, data: result });
      } else
        res.status(404).send({ status: 404, data: "User is not registered" });
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// user -> create
exports.CreateUser = (req, res, next) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    steamId: req.body.steamId,
    isWhiteListed: req.body.isWhiteListed,
    role: req.body.role,
    password: md5("123456"),
  });
  User.findOne({ email: req.body.email })
    .then((result) => {
      if (!result) {
        newUser
          .save()
          .then((resUser) => {
            res.status(200).send({ status: 200, data: resUser });
          })
          .catch((err) => {
            res.status(400).send({ status: 400, data: err });
          });
      } else {
        res.status(409).send({ status: 409, data: "Already Exists!" });
      }
    })
    .catch((err) => {
      res.status(400).send({ status: 400, data: err });
    });
};

// user -> delete
exports.DeleteUser = (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then((removedUser) => {
      res.status(200).send({ status: 200, data: removedUser });
    })
    .catch((err) => {
      res.status(400).send({ status: 400, data: err });
    });
};

// user -> all
exports.AllUsers = (req, res, next) => {
  User.find()
    .then((resUsers) => {
      res.status(200).send({ status: 200, data: resUsers });
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// user -> detail
exports.DetailUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((resUser) => {
      res.status(200).send({ status: 200, data: resUser });
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// user -> whitelisted -> :steamId
exports.WhiteListedBySteamId = (req, res, next) => {
  const { steamId } = req.params;
  User.findOne({ steamId })
    .then((resUser) => {
      if (resUser) {
        res.status(200).send({ status: 200, data: resUser.isWhiteListed });
      } else {
        res.status(404).send({ status: 404, data: "Not Found" });
      }
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// user -> whitelist -> :streamId
exports.SetWhiteListBySteamId = (req, res, next) => {
  const { steamId } = req.params;
  User.findOne({ steamId })
    .then((resUser) => {
      if (resUser) {
        resUser.isWhiteListed = req.body.isWhiteListed;

        resUser
          .save()
          .then((editUser) =>
            res.status(200).send({ status: 200, data: editUser })
          )
          .catch((err) => res.status(400).send({ status: 400, data: err }));
      } else {
        res.status(404).send({ status: 404, data: "Not Found" });
      }
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};

// user -> edit
exports.EditUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((resUser) => {
      resUser.firstName = req.body.firstName;
      resUser.lastName = req.body.lastName;
      resUser.email = req.body.email;
      resUser.steamId = req.body.steamId;
      resUser.isWhiteListed = req.body.isWhiteListed;
      resUser.role = req.body.role;
      resUser.password = md5("123456");

      resUser
        .save()
        .then((editUser) =>
          res.status(200).send({ status: 200, data: editUser })
        )
        .catch((err) => res.status(400).send({ status: 400, data: err }));
    })
    .catch((err) => res.status(400).send({ status: 400, data: err }));
};
