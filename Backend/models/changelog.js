const mongoose = require("mongoose");

const changelogSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  subLogs: {
    type: String,
    trim: true,
  },
  logDate: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("ChangeLog", changelogSchema);
