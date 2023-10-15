// importing models
const Club = require("../models/club");

// club -> test
exports.test = (req, res, next) => {
  res.send("Club Controller Running Successfully!");
};
