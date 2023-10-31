const mongoose = require("mongoose");

const applicationTypeSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  userGroup: {
    type: String,
    trim: true,
  },
  permission: {
    type: String,
    trim: true,
  },
  logo: {
    type : String,
  },
});

module.exports = mongoose.model("ApplicationType", applicationTypeSchema);
