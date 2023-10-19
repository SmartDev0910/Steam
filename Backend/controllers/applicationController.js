// importing models
const Application = require("../models/application");

// application -> test
exports.test = (req, res, next) => {
  res.send("Application Controller Running Successfully!");
};

// application -> :steam64
exports.GetApplicationBySteam64 = (req, res, next) => {
  const { steam64 } = req.params;
  Application.find({ submittedBy: steam64 })
    .then((resApplication) => {
      if (resApplication) {
        res.status(200).send(resApplication);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => res.status(400).send(err));
};

// application -> create -> :steam64
exports.CreateApplication = (req, res, next) => {
  const newApplication = new Application({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    submittedBy: req.params.steam64,
  });
  newApplication
    .save()
    .then((resApplication) => {
      res.status(200).send(resApplication);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
