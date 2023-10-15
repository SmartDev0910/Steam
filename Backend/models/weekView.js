const mongoose = require("mongoose");

const weekViewSchema = new mongoose.Schema({
  week: {
    type: String,
    default: "",
  },
  monCount: {
    type: Number,
    default: 0,
  },
  tueCount: {
    type: Number,
    default: 0,
  },
  wedCount: {
    type: Number,
    default: 0,
  },
  thuCount: {
    type: Number,
    default: 0,
  },
  friCount: {
    type: Number,
    default: 0,
  },
  satCount: {
    type: Number,
    default: 0,
  },
  sunCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("WeekView", weekViewSchema);
