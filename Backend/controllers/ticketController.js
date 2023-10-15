// importing models
const Ticket = require("../models/ticket");

// ticket -> test
exports.test = (req, res, next) => {
  res.send("Ticket Controller Running Successfully!");
};
