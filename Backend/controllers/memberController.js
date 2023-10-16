// importing models
const Member = require("../models/member");
const md5 = require("md5");

// members -> test
exports.test = (req, res, next) => {
  res.send("Member Controller Running Successfully!");
};

// members -> SignIn
exports.SignIn = (req, res, next) => {
  Member.findOne({ email: req.body.email })
    .then((result) => {
      if (result) {
        if (result.password !== md5(req.body.password))
          res.status(401).send("Password is incorrect");
        else res.status(200).send(result);
      } else res.status(404).send("Member is not registered");
    })
    .catch((err) => res.status(400).send(err));
};

// members -> create
exports.CreateMember = (req, res, next) => {
  const newMember = new Member({
    email: req.body.email,
    steam64: req.body.steam64,
    isWhiteListed: req.body.isWhiteListed,
    isBanned: req.body.isBanned,
    ipAddress: req.body.ipAddress,
    password: md5("123456"),
  });
  Member.findOne({ email: req.body.email })
    .then((result) => {
      if (!result) {
        newMember
          .save()
          .then((resMember) => {
            res.status(200).send(resMember);
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      } else {
        res.status(409).send("Already Exists!");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// members -> all
exports.GetAllMembers = (req, res, next) => {
  Member.find()
    .then((resMembers) => {
      res.status(200).send(resMembers);
    })
    .catch((err) => res.status(400).send(err));
};

// members -> detail -> :steam64
exports.DetailMember = (req, res, next) => {
  const { steam64 } = req.params;
  Member.findOne({ steam64 })
    .then((resMember) => {
      res.status(200).send(resMember);
    })
    .catch((err) => res.status(400).send(err));
};

// members -> whitelist -> :steam64
exports.GetWhiteListedBySteam64 = (req, res, next) => {
  const { steam64 } = req.params;
  Member.findOne({ steam64 })
    .then((resMember) => {
      if (resMember) {
        res.status(200).send(resMember.isWhiteListed);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => res.status(400).send(err));
};

// members -> whitelist -> :steam64
exports.SetWhiteListedBySteam64 = (req, res, next) => {
  const { steam64 } = req.params;
  Member.findOne({ steam64 })
    .then((resMember) => {
      if (resMember) {
        resMember.isWhiteListed = true;

        resMember
          .save()
          .then((editMember) => res.status(200).send(editMember))
          .catch((err) => res.status(400).send(err));
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => res.status(400).send(err));
};

// members -> ban -> :steam64
exports.SetBannedBySteam64 = (req, res, next) => {
  const { steam64 } = req.params;
  Member.findOne({ steam64 })
    .then((resMember) => {
      if (resMember) {
        resMember.isBanned = req.body.isBanned;

        resMember
          .save()
          .then((editMember) => res.status(200).send(editMember))
          .catch((err) => res.status(400).send(err));
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => res.status(400).send(err));
};

// members -> update -> steam64
exports.UpdateMember = (req, res, next) => {
  const { steam64 } = req.params;
  Member.findOne({ steam64 })
    .then((resMember) => {
      resMember.email = req.body.email;
      resMember.steam64 = req.body.steam64;
      resMember.isWhiteListed = req.body.isWhiteListed;
      resMember.isBanned = req.body.isBanned;
      resMember.ipAddress = req.body.ipAddress;
      resMember.password = md5("123456");

      resMember
        .save()
        .then((editMember) => res.status(200).send(editMember))
        .catch((err) => res.status(400).send(err));
    })
    .catch((err) => res.status(400).send(err));
};

// members -> delete
exports.DeleteMember = (req, res, next) => {
  const { id } = req.params;
  Member.findByIdAndRemove(id)
    .then((removedMember) => {
      res.status(200).send(removedMember);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
