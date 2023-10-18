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
  let ipAddress =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);

  // If IP address is in IPv6 format, extract the IPv4 part
  if (ipAddress.includes("::ffff:")) {
    ipAddress = ipAddress.split("::ffff:")[1];
  }

  const newMember = new Member({
    email: req.body.email ? req.body.email : "",
    steam64: req.body.steam64 ? req.body.steam64 : "",
    discordId: req.body.discordId ? req.body.discordId : "",
    isWhiteListed: req.body.isWhiteListed ? req.body.isWhiteListed : false,
    isBanned: req.body.isBanned ? req.body.isBanned : false,
    ipAddress: ipAddress,
    password: req.body.password ? md5(req.body.password) : "",
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

// members -> whitelist -> :id
exports.GetWhiteListedById = (req, res, next) => {
  const { id } = req.params;
  Member.findById(id)
    .then((resMember) => {
      if (resMember) {
        res.status(200).send(resMember.isWhiteListed);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => res.status(400).send(err));
};

// members -> whitelist -> :id
exports.SetWhiteListedById = (req, res, next) => {
  const { id } = req.params;
  Member.findById(id)
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

// members -> update -> id
exports.UpdateMember = (req, res, next) => {
  const { id } = req.params;
  Member.findById(id)
    .then((resMember) => {
      resMember.email = req.body.email;
      resMember.steam64 = req.body.steam64;
      resMember.discordId = req.body.discordId;
      resMember.isWhiteListed = req.body.isWhiteListed;
      resMember.isBanned = req.body.isBanned;
      resMember.ipAddress = req.body.ipAddress;
      resMember.password = req.body.password;

      resMember
        .save()
        .then((updatedMember) => res.status(200).send(updatedMember))
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
