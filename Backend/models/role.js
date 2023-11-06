const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  roleID: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Role", roleSchema);
