const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  foodId: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    default: "",
  },
  cash: {
    type: String,
    default: "",
  },
  count: {
    type: Number,
    default: 0,
  },
  orderBy: {
    type: String,
    default: "",
  },
  orderCount: {
    type: Number,
    default: 0,
  },
  orderDate: {
    type: String,
    default: "",
  },
  filter: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Food", foodSchema);
