const Appointment = require("../models/Appointment");
const Slot = require("../models/Slot");
const Doctor = require("../models/Doctor");

exports.bookAppointment = async (req, res) => {
  const { doctorId, slotId } = req.body;

  const slot = await Slot.findById(slotId);
  if (!slot || slot.isBooked) {
    return res.status(400).json({ message: "Slot not available" });
  }

  const doctor = await Doctor.findById(doctorId);

  const appointment = await Appointment.create({
    patient: req.user.id,
    doctor: doctorId,
    hospital: doctor.hospital,
    date: slot.date,
    time: slot.time
  });

  slot.isBooked = true;
  await slot.save();

  res.json({ message: "Appointment booked", appointment });
};

exports.getPatientAppointments = async (req, res) => {
  const appointments = await Appointment.find({ patient: req.user.id })
    .populate("doctor")
    .populate("hospital");

  res.json(appointments);
};

exports.updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;

  await Appointment.findByIdAndUpdate(req.params.id, { status });
  res.json({ message: "Appointment updated" });
};
