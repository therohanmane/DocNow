const router = require("express").Router();
const {
  registerHospital,
  loginHospital
} = require("../controllers/hospital.controller");

router.post("/register", registerHospital);
router.post("/login", loginHospital);

const { getApprovedHospitals } = require("../controllers/hospital.controller");
router.get('/list', getApprovedHospitals);

module.exports = router;
