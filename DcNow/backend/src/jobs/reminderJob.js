const cron = require("node-cron");
const Appointment = require("../models/Appointment");
const Notification = require("../models/Notification");
const Patient = require("../models/Patient");
const sendEmail = require("../utils/sendEmail");

const REMINDER_HOURS = [72, 24, 2];

cron.schedule("0 * * * *", async () => {
  console.log("🔔 Reminder cron running...");

  const now = new Date();

  const appointments = await Appointment.find({
    status: "APPROVED"
  }).populate("patient");

  for (let appt of appointments) {
    const appointmentTime = new Date(`${appt.date} ${appt.time}`);
    const diffHours = Math.round(
      (appointmentTime - now) / (1000 * 60 * 60)
    );

    if (REMINDER_HOURS.includes(diffHours)) {
      const message = `Reminder: You have an appointment on ${appt.date} at ${appt.time}`;

      // Save notification
      await Notification.create({
        userId: appt.patient._id,
        message,
        type: "EMAIL"
      });

      // Send email
      await sendEmail(
        appt.patient.email,
        "Appointment Reminder",
        message
      );

      console.log("📧 Reminder sent to", appt.patient.email);
    }
  }
});
