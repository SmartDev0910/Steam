const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  age: {
    type: String,
    trim: true,
  },
  submittedBy: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Application", applicationSchema);
