// importing models
const StarterGuide = require("../models/starterGuide");

exports.CreateStarterGuide = (req, res, next) => {
  const version = "1.0";
  StarterGuide.findOne({ version })
    .then((resStarterGuide) => {
      if (resStarterGuide) {
        resStarterGuide = Object.assign(resStarterGuide, req.body);

        resStarterGuide
          .save()
          .then((editStarterGuide) => res.status(200).send(editStarterGuide))
          .catch((err) => {
            res.status(400).send(err)
          });
      } else {
        const newStarterGuide = new StarterGuide({
          content: req.body.content ? req.body.content : "",
          version,
        });

        newStarterGuide
          .save()
          .then((resStarterGuide) => {
            res.status(200).send(resStarterGuide);
          })
          .catch((err) => res.status(400).send(err));
      }
    })
    .catch((err) => res.status(400).send(err));
};

exports.ListStarterGuides = (req, res, next) => {
  StarterGuide.find()
    .then((resStarterGuides) => {
      res.status(200).send(resStarterGuides);
    })
    .catch((err) => res.status(400).send(err));
};

exports.UpdateStarterGuideById = (req, res, next) => {
  const { _id } = req.params;
  StarterGuide.findOne({ _id })
    .then((resStarterGuide) => {
      if (resStarterGuide) {
        resStarterGuide = Object.assign(resStarterGuide, req.body);

        resStarterGuide
          .save()
          .then((editStarterGuide) => res.status(200).send(editStarterGuide))
          .catch((err) => res.status(400).send(err));
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => res.status(400).send(err));
};
