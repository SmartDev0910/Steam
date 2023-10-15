// importing models
const Food = require("../models/food");

// food -> test
exports.test = (req, res, next) => {
  res.send("Food Controller Running Successfully!");
};
