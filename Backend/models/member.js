const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  passwordLastChanged: {
    type : String,
  },
  steam64: {
    type: String,
    trim: true,
  },
  discordID: {
    type: String,
    trim: true,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  mfaEnabled: {
    type: Boolean,
    default: false
  },
  mfaPhoneNumber: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    trim: true,
  },
  applications: [{
    applicationTypeId: {
      type: String,
      trim: true,
    },
    audio: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    }
  }],
  ip: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Member", memberSchema);
