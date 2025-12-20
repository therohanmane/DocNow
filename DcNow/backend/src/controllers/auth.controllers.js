const Patient = require("../models/Patient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {
  const { name, email, password, phone, address, age, gender } = req.body;

  const existing = await Patient.findOne({ email });
  if (existing) return res.status(400).json({ message: "User exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await Patient.create({ name, email, password: hashed, phone, address, age, gender });
  // send confirmation email (best effort)
  try {
    if (user.email) await sendEmail(user.email, 'Welcome to DocNow', `Hello ${user.name},\n\nThank you for registering at DocNow.`);
  } catch (e) {
    console.error('Failed to send email', e.message || e);
  }

  res.json({ message: "Registered successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Patient.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, user });
};
