const mongoose = require("mongoose");

module.exports = mongoose.model("Appointment", new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
  date: String,
  time: String,
  status: { type: String, default: "PENDING" }
}));
