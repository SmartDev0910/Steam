const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  clubId: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Club", clubSchema);
