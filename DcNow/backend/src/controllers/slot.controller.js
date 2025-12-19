const Slot = require("../models/Slot");

exports.createSlots = async (req, res) => {
  const { doctorId, date, times } = req.body;

  const slots = times.map(time => ({
    doctor: doctorId,
    date,
    time
  }));

  await Slot.insertMany(slots);
  res.json({ message: "Slots created successfully" });
};

exports.getAvailableSlots = async (req, res) => {
  const slots = await Slot.find({
    doctor: req.params.doctorId,
    isBooked: false
  });
  res.json(slots);
};
