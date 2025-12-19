const Hospital = require("../models/Hospital");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerHospital = async (req, res) => {
  const { name, email, password, city } = req.body;

  const exist = await Hospital.findOne({ email });
  if (exist) return res.status(400).json({ message: "Hospital exists" });

  const hashed = await bcrypt.hash(password, 10);

  const hospital = await Hospital.create({
    hospitalId: "HOS-" + Date.now(),
    name,
    email,
    password: hashed,
    city
  });

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
