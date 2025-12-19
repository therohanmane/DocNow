const router = require("express").Router();
const {
  registerHospital,
  loginHospital
} = require("../controllers/hospital.controller");

router.post("/register", registerHospital);
router.post("/login", loginHospital);

module.exports = router;
