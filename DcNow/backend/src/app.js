const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/hospital", require("./routes/hospital.routes"));
app.use("/api/doctor", require("./routes/doctor.routes"));
app.use("/api/slot", require("./routes/slot.routes"));
app.use("/api/appointment", require("./routes/appointment.routes"));
app.use("/api/admin", require("./routes/admin.routes"));

app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app;
