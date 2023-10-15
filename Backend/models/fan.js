const mongoose = require("mongoose");

const fanSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  birthDate: {
    type: String,
    default: "",
  },
  ageGroup: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  favouriteCountry: {
    type: String,
    default: "",
  },
  favouriteTeam: {
    type: String,
    default: "",
  },
  favouritePlayer: {
    type: String,
    default: "",
  },
  watchingPlace: {
    type: String,
    default: "",
  },
  interest: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Fan", fanSchema);
