const mongoose = require("mongoose");

module.exports = mongoose.model("Slot", new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  date: String,
  time: String,
  isBooked: { type: Boolean, default: false }
}));
