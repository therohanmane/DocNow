const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const Appointment = require("../models/Appointment");
const Slot = require("../models/Slot");
const Doctor = require("../models/Doctor");

router.post("/book", auth, async (req, res) => {
  const slot = await Slot.findById(req.body.slotId);
  if (!slot || slot.isBooked) return res.status(400).json({ message: "Unavailable" });

  const doctor = await Doctor.findById(req.body.doctorId);

  const appt = await Appointment.create({
    patient: req.user.id,
    doctor: doctor._id,
    hospital: doctor.hospital,
    date: slot.date,
    time: slot.time
  });

  slot.isBooked = true;
  await slot.save();

  res.json(appt);
});

router.get("/my", auth, async (req, res) => {
  res.json(await Appointment.find({ patient: req.user.id }).populate("doctor"));
});

module.exports = router;
