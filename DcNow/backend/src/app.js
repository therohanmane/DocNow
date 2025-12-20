
const express = require("express");   // ✅ MISSING LINE (VERY IMPORTANT)
const cors = require("cors");

const app = express();

// Debug middleware (keep for now)
app.use((req, res, next) => {
  console.log("➡️ Incoming:", req.method, req.url);
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// AUTH ROUTES
app.use("/api/auth", require("./routes/auth.routes"));

// ROOT TEST
app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app;
