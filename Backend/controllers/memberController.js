// importing models
const jwt = require("jsonwebtoken");
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
        else {
          jwt.sign({ user: req.body.email }, "secretkey", (err, token) => {
            res.status(200).json({token, result});
          });
        }
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
    discordID: req.body.discordID ? req.body.discordID : "",
    isBanned: req.body.isBanned ? req.body.isBanned : false,
    ip: ip,
    role: "5", // default is ordinary member
  });

  Member.findOne({ email: req.body.email })
    .then((result) => {
      if (!result) {
        newMember
          .save()
          .then((resMember) => {
            jwt.sign({ user: req.body.email }, "secretkey", (err, token) => {
              res.status(200).json({token, result: resMember});
            });
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
  const filePath = req.file.path;
  Member.findOne({ _id })
    .then((resMember) => {
      const myApplications = resMember.applications;
      const alreadyApplied = myApplications.find(obj => obj.applicationTypeId === applicationTypeId)
      if (alreadyApplied) {
        res.status(400).send("Already Applied");
        return;
      }
      resMember.applications.push({ applicationTypeId, audio: filePath, status: "pending"});
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
  const isApprove = req.body.isApprove ? req.body.isApprove : "";
  
  // TODO: check the role of the API caller
  
  Member.findOne({ _id })
    .then((resMember) => {
      const myApplications = resMember.applications;
      const indexToUpdate = myApplications.findIndex(obj => obj.applicationTypeId === applicationTypeId);

      if (indexToUpdate === -1) {
        res.status(400).send("Not applied yet, apply first");
        return;
      }
      resMember.applications[indexToUpdate].status = isApprove == true ? "approved": "rejected";

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
