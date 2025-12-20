const mongoose = require("mongoose");

module.exports = mongoose.model("Doctor", new mongoose.Schema({
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
  name: String,
  specialization: String,
  experience: Number,
  phone: String,
  email: String,
  qualification: String
}));
