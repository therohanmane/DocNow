const router = require("express").Router();
const Slot = require("../models/Slot");
const auth = require("../middleware/auth.middleware");

router.post("/", auth, async (req, res) => {
  const slots = req.body.times.map(t => ({
    doctor: req.body.doctorId,
    date: req.body.date,
    time: t
  }));
  await Slot.insertMany(slots);
  res.json({ message: "Slots created" });
});

router.get("/:doctorId", async (req, res) => {
  res.json(await Slot.find({ doctor: req.params.doctorId, isBooked: false }));
});

module.exports = router;
