const Hospital = require("../models/Hospital");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");

exports.getDashboardStats = async (req, res) => {
  const hospitals = await Hospital.countDocuments();
  const doctors = await Doctor.countDocuments();
  const patients = await Patient.countDocuments();
  const appointments = await Appointment.countDocuments();

  res.json({
    hospitals,
    doctors,
    patients,
    appointments
  });
};

exports.appointmentsPerDay = async (req, res) => {
  const data = await Appointment.aggregate([
    {
      $group: {
        _id: "$date",
        count: { $sum: 1 }
      }
    }
  ]);

  res.json(data);
};
