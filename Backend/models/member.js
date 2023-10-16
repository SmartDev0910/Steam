const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
  },
  steam64: {
    type: String,
    trim: true,
  },
  isWhiteListed: {
    type: String,
    trim: true,
  },
  isBanned: {
    type: String,
    trim: true,
  },
  ipAddress: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Member", memberSchema);
