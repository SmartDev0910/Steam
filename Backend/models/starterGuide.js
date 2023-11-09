const mongoose = require("mongoose");

const starterGuideSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
  },
  version: {
    type: String,
    trim: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StarterGuide", starterGuideSchema);
