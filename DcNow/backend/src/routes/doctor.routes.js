const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const Doctor = require("../models/Doctor");

router.post("/", auth, async (req, res) => {
  const doctor = await Doctor.create({ ...req.body, hospital: req.user.id });
  res.json(doctor);
});

router.get("/:hospitalId", async (req, res) => {
  res.json(await Doctor.find({ hospital: req.params.hospitalId }));
});

module.exports = router;
