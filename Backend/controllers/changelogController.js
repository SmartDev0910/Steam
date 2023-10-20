// importing models
const ChangeLog = require("../models/changelog");

// change-log -> test
exports.test = (req, res, next) => {
  res.send("ChangeLog Controller Running Successfully!");
};

// change-log -> all
exports.GetAllChangeLogs = (req, res, next) => {
  ChangeLog.find()
    .then((resChangeLogs) => {
      res.status(200).send(resChangeLogs);
    })
    .catch((err) => res.status(400).send(err));
};

// change-log -> create
exports.CreateChangeLog = (req, res, next) => {
  const newChangeLog = new ChangeLog({
    title: req.body.title,
    subTitle: req.body.subTitle,
    subDescription: req.body.subDescription,
    type: req.body.type,
    logDate: req.body.logDate,
  });
  newChangeLog
    .save()
    .then((resChangeLog) => {
      res.status(200).send(resChangeLog);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// change-log -> delete
exports.DeleteChangeLog = (req, res, next) => {
  const { id } = req.params;
  ChangeLog.findByIdAndRemove(id)
    .then((removedChangeLog) => {
      res.status(200).send(removedChangeLog);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
