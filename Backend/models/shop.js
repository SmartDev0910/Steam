const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "",
  },
  turnover: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "",
  },
  creationDate: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Shop", shopSchema);
