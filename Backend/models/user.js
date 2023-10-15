const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  steamId: {
    type: String,
    trim: true,
  },
  isWhiteListed: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    trim: true,
  },
  password: String,
});

module.exports = mongoose.model("User", userSchema);
