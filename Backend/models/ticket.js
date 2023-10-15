const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  ticketId: {
    type: Number,
    default: 0,
  },
  seatNumber: {
    type: String,
    default: "",
  },
  match: {
    type: String,
    trim: true,
  },
  matchDate: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
