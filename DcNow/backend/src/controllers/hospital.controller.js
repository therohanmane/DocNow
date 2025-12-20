const Hospital = require("../models/Hospital");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

exports.registerHospital = async (req, res) => {
  const { name, email, password, city, phone, address } = req.body;

  const exist = await Hospital.findOne({ email });
  if (exist) return res.status(400).json({ message: "Hospital exists" });

  const hashed = await bcrypt.hash(password, 10);

  const hospital = await Hospital.create({
    hospitalId: "HOS-" + Date.now(),
    name,
    email,
    password: hashed,
    city,
    phone,
    address
  });
  try {
    if (hospital.email) await sendEmail(hospital.email, 'Hospital registered', `Hello ${hospital.name},\n\nYour hospital has been registered and is pending admin approval.`);
  } catch (e) {
    console.error('Failed to send email', e.message || e);
  }

  res.json({ message: "Hospital registered, pending approval" });
};

exports.loginHospital = async (req, res) => {
  const { email, password } = req.body;

  const hospital = await Hospital.findOne({ email });
  if (!hospital) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, hospital.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: hospital._id, role: "HOSPITAL" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, hospital });
};

exports.getApprovedHospitals = async (req, res) => {
  const hospitals = await Hospital.find({ status: 'APPROVED' });
  res.json(hospitals);
};

exports.getApprovedHospitals = async (req, res) => {
  const hospitals = await require('../models/Hospital').find({ status: 'APPROVED' });
  res.json(hospitals);
};
