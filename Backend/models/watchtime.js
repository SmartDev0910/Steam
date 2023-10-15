const mongoose = require("mongoose");

const watchTimeSchema = new mongoose.Schema({
  watchDate: {
    type: String,
    default: "",
  },
  watchTime03: {
    type: Number,
    default: 0,
  },
  watchTime36: {
    type: Number,
    default: 0,
  },
  watchTime69: {
    type: Number,
    default: 0,
  },
  watchTime912: {
    type: Number,
    default: 0,
  },
  watchTime1215: {
    type: Number,
    default: 0,
  },
  watchTime1518: {
    type: Number,
    default: 0,
  },
  watchTime1821: {
    type: Number,
    default: 0,
  },
  watchTime2124: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("WatchTime", watchTimeSchema);
