const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  ageGroup: {
    type: String,
    default: "[]",
  },
  countries: {
    type: String,
    default: "[]",
  },
  uploadTo: {
    type: String,
    default: "[]",
  },
  videoUrl: {
    type: String,
    default: "",
  },
  clicksCount: {
    type: Number,
    default: 0,
  },
  viewsCount: {
    type: Number,
    default: 0,
  },
  income: {
    type: Number,
    default: 0,
  },
  source: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "",
  },
  adSponsorName: {
    type: String,
    default: "",
  },
  adLogoUrl: {
    type: String,
    default: "",
  },
  adDescription: {
    type: String,
    default: "",
  },
  adAction: {
    type: String,
    default: "",
  },
  adPrice: {
    type: String,
    default: "",
  },
  adActionColor: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Video", videoSchema);
