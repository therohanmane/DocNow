const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const Appointment = require("../models/Appointment");
const Slot = require("../models/Slot");
const Doctor = require("../models/Doctor");
const sendEmail = require("../utils/sendEmail");

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
  // notify patient and hospital (best-effort)
  try {
    const patient = req.user.id;
    // fetch patient email via model
    const Patient = require("../models/Patient");
    const patientObj = await Patient.findById(req.user.id);
    const hospitalObj = await Doctor.findById(req.body.doctorId).populate('hospital');
    if (patientObj?.email) await sendEmail(patientObj.email, 'Appointment booked', `Your appointment with Dr ${doctor.name} on ${slot.date} at ${slot.time} is booked.`);
    if (hospitalObj?.hospital?.email) await sendEmail(hospitalObj.hospital.email, 'New appointment', `A patient booked an appointment with Dr ${doctor.name} on ${slot.date} at ${slot.time}.`);
  } catch (e) {
    console.error('Failed to send notification emails', e.message || e);
  }

  res.json(appt);
});

router.get("/my", auth, async (req, res) => {
  res.json(await Appointment.find({ patient: req.user.id }).populate("doctor"));
});

module.exports = router;
