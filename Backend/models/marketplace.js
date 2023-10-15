const mongoose = require("mongoose");

const marketplaceSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  plans: {
    type: String,
    default: "",
  },
  pricing: {
    type: String,
    default: "",
  },
  logoUrl: {
    type: String,
    default: "",
  },
  applied: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Marketplace", marketplaceSchema);
