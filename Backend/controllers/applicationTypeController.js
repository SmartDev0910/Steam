// importing models
const ApplicationType = require("../models/applicationType");
const Member = require("../models/member");

exports.CreateApplicationType = (req, res, next) => {

  const newApplicationType = new ApplicationType({
    title: req.body.title ? req.body.title : "",
    userGroup: req.body.userGroup ? req.body.userGroup : "",
    permission: req.body.permission ? req.body.permission : "",
    logo: req.body.logo ? req.body.logo : "",
  });

  newApplicationType
    .save()
    .then((resApplicationType) => {
      res.status(200).send(resApplicationType);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.ListApplicationTypes = (req, res, next) => {
  ApplicationType.find()
    .then((resApplicationTypes) => {
      res.status(200).send(resApplicationTypes);
    })
    .catch((err) => res.status(400).send(err));
};

exports.ListApplicationTypeById = (req, res, next) => {
  const { _id } = req.params;
  ApplicationType.findOne({ _id })
    .then((resApplicationType) => {
      res.status(200).send(resApplicationType);
    })
    .catch((err) => res.status(400).send(err));
};

exports.ListAppliedMembers = (req, res, next) => {
  const { _id } = req.params;
  Member.find({ applications: {$elemMatch: {applicationTypeId: _id, status: "pending"}} })
    .then((resAppliedMembers) => {
      res.status(200).send(resAppliedMembers);
    })
    .catch((err) => res.status(400).send(err));
};

exports.UpdateApplicationTypeById = (req, res, next) => {
  const { _id } = req.params;
  ApplicationType.findOne({ _id })
    .then((resApplicationType) => {
      if (resApplicationType) {
        resApplicationType = Object.assign(resApplicationType, req.body);

        resApplicationType
          .save()
          .then((editApplicationType) => res.status(200).send(editApplicationType))
          .catch((err) => res.status(400).send(err));
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => res.status(400).send(err));
};

exports.DeleteApplicationTypeById = (req, res, next) => {
  const { id } = req.params;
  ApplicationType.findByIdAndRemove(id)
    .then((removedApplicationType) => {
      res.status(200).send(removedApplicationType);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
