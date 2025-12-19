const Doctor = require("../models/Doctor");

exports.addDoctor = async (req, res) => {
  const doctor = await Doctor.create({
    hospital: req.user.id,
    ...req.body
  });
  res.json(doctor);
};

exports.getDoctorsByHospital = async (req, res) => {
  const doctors = await Doctor.find({ hospital: req.params.hospitalId });
  res.json(doctors);
};
