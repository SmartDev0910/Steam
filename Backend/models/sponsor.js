const mongoose = require("mongoose");

const sponsorSchema = new mongoose.Schema({
  sponsorName: {
    type: String,
    default: "",
  },
  contactFullName: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  mobile: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "",
  },
  dealsize: {
    type: String,
    default: "",
  },
  creationDate: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "",
  },
  logoUrl: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Sponsor", sponsorSchema);
