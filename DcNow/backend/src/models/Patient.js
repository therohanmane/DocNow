const mongoose = require("mongoose");

module.exports = mongoose.model("Patient", new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  address: String,
  age: Number,
  gender: String,
  role: { type: String, default: "PATIENT" }
}));
