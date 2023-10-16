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
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
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
