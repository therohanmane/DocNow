const Hospital = require("../models/Hospital");

exports.getAllHospitals = async (req, res) => {
  const hospitals = await Hospital.find();
  res.json(hospitals);
};

exports.approveHospital = async (req, res) => {
  await Hospital.findByIdAndUpdate(req.params.id, {
    status: "APPROVED"
  });
  res.json({ message: "Hospital approved" });
};

exports.suspendHospital = async (req, res) => {
  await Hospital.findByIdAndUpdate(req.params.id, {
    status: "SUSPENDED"
  });
  res.json({ message: "Hospital suspended" });
};
