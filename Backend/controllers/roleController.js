// importing models
const Role = require("../models/role");

exports.CreateRole = (req, res, next) => {

  const newRole = new Role({
    name: req.body.name ? req.body.name : "",
    roleID: req.body.roleID ? req.body.roleID : "",
  });

  newRole
    .save()
    .then((resRole) => {
      res.status(200).send(resRole);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.ListRoles = (req, res, next) => {
  Role.find()
    .then((resRoles) => {
      res.status(200).send(resRoles);
    })
    .catch((err) => res.status(400).send(err));
};

exports.ListRoleById = (req, res, next) => {
  const { roleID } = req.params;
  Role.findOne({ roleID })
    .then((resRole) => {
      res.status(200).send(resRole);
    })
    .catch((err) => res.status(400).send(err));
};

exports.UpdateRoleById = (req, res, next) => {
  const { _id } = req.params;
  Role.findOne({ _id })
    .then((resRole) => {
      if (resRole) {
        resRole = Object.assign(resRole, req.body);

        resRole
          .save()
          .then((editRole) => res.status(200).send(editRole))
          .catch((err) => res.status(400).send(err));
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => res.status(400).send(err));
};

exports.DeleteRoleById = (req, res, next) => {
  const { id } = req.params;
  Role.findByIdAndRemove(id)
    .then((removedRole) => {
      res.status(200).send(removedRole);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
