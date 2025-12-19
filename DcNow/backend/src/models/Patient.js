const mongoose = require("mongoose");

module.exports = mongoose.model("Patient", new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "PATIENT" }
}));
