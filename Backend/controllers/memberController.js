// importing models
const Member = require("../models/member");
const md5 = require("md5");

exports.SignIn = (req, res, next) => {
  Member.findOne({ email: req.body.email })
    .then((result) => {
      if (result) {
        if (result.password !== md5(req.body.password))
          res.status(401).send("Password is incorrect");
        else if (result.isBanned)
        res.status(401).send("Your account is blocked");
        else res.status(200).send(result);
      } else res.status(404).send("Member is not registered");
    })
    .catch((err) => res.status(400).send(err));
};

exports.CreateMember = (req, res, next) => {
  let ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);

  // If IP address is in IPv6 format, extract the IPv4 part
  if (ip.includes("::ffff:")) {
    ip = ip.split("::ffff:")[1];
  }

  const newMember = new Member({
    name: req.body.name ? req.body.name : "",
    email: req.body.email ? req.body.email : "",
    password: req.body.password ? md5(req.body.password) : "",
    steam64: req.body.steam64 ? req.body.steam64 : "",
    discordId: req.body.discordId ? req.body.discordId : "",
    isBanned: req.body.isBanned ? req.body.isBanned : false,
    ip: ip,
    role: "ordinary", // default is ordinary member
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

exports.Apply = (req, res, next) => {
  const { _id } = req.params;
  const applicationTypeId = req.body.applicationTypeId ? req.body.applicationTypeId : "";
  const audio = req.body.audio ? req.body.audio : "";
  Member.findOne({ _id })
    .then((resMember) => {
      const myApplications = resMember.applications;
      const alreadyApplied = myApplications.find(obj => obj.applicationTypeId === applicationTypeId)
      if (alreadyApplied) {
        res.status(400).send("Already Applied");
        return;
      }
      resMember.applications.push({ applicationTypeId, audio, status: "pending"});
      resMember
          .save()
          .then((editMember) => res.status(200).send(editMember))
          .catch((err) => res.status(400).send(err));
    })
    .catch((err) => res.status(400).send(err));
};

exports.ReviewApplication = (req, res, next) => {
  const { _id } = req.params;
  const applicationTypeId = req.body.applicationTypeId ? req.body.applicationTypeId : "";
  
  // TODO: check the role of the API caller
  
  Member.findOne({ _id })
    .then((resMember) => {
      const myApplications = resMember.applications;
      const applied = myApplications.find(obj => obj.applicationTypeId === applicationTypeId)
      if (!applied) {
        res.status(400).send("Not applied yet, apply first");
        return;
      }
      // resMember.applications.
      resMember
          .save()
          .then((editMember) => res.status(200).send(editMember))
          .catch((err) => res.status(400).send(err));
    })
    .catch((err) => res.status(400).send(err));
};

exports.ListMembers = (req, res, next) => {
  Member.find()
    .then((resMembers) => {
      res.status(200).send(resMembers);
    })
    .catch((err) => res.status(400).send(err));
};

exports.ListMemberById = (req, res, next) => {
  const { _id } = req.params;
  Member.findOne({ _id })
    .then((resMember) => {
      res.status(200).send(resMember);
    })
    .catch((err) => res.status(400).send(err));
};

exports.UpdateMemberById = (req, res, next) => {
  const { _id } = req.params;
  Member.findOne({ _id })
    .then((resMember) => {
      if (resMember) {
        resMember = Object.assign(resMember, req.body);

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

exports.ChangePassword = (req, res, next) => {
  const { _id } = req.params;
  Member.findOne({ _id })
    .then((resMember) => {
      if (resMember) {
        if (resMember.password !== md5(req.body.currentPassword)) {
          res.status(401).json({ message: "current password is incorrect" });
          return
        }
        resMember.password = md5(req.body.newPassword)
        resMember.passwordLastChanged = Date.now()

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

exports.DeleteMemberById = (req, res, next) => {
  const { id } = req.params;
  Member.findByIdAndRemove(id)
    .then((removedMember) => {
      res.status(200).send(removedMember);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
