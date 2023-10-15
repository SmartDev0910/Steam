// importing models
const Application = require("../models/application");

// application -> test
exports.test = (req, res, next) => {
  res.send("Application Controller Running Successfully!");
};

// application -> create
exports.CreateApplication = (req, res, next) => {
  const newApplication = new Application({
    title: req.body.title,
    description: req.body.description,
    submittedBy: req.body.submittedBy,
  });
  newApplication
    .save()
    .then((resApplication) => {
      res.status(200).send({ status: 200, data: resApplication });
    })
    .catch((err) => {
      res.status(400).send({ status: 400, data: err });
    });
};
