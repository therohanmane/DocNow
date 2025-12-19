const mongoose = require("mongoose");

module.exports = mongoose.model("Hospital", new mongoose.Schema({
  hospitalId: String,
  name: String,
  email: String,
  password: String,
  city: String,
  status: { type: String, default: "PENDING" }
}));
