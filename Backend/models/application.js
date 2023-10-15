const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  submittedBy: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Application", applicationSchema);
