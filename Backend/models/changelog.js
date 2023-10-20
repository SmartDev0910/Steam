const mongoose = require("mongoose");

const changelogSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  subTitle: {
    type: String,
    trim: true,
  },
  subDescription: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    trim: true,
  },
  logDate: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("ChangeLog", changelogSchema);
