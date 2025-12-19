const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/admin.middleware");

const { adminLogin } = require("../controllers/admin.controller");
const {
  getAllHospitals,
  approveHospital,
  suspendHospital
} = require("../controllers/adminHospital.controller");

const {
  getDashboardStats,
  appointmentsPerDay
} = require("../controllers/analytics.controller");

// Auth
router.post("/login", adminLogin);

// Hospital management
router.get("/hospitals", auth, isAdmin, getAllHospitals);
router.put("/hospital/approve/:id", auth, isAdmin, approveHospital);
router.put("/hospital/suspend/:id", auth, isAdmin, suspendHospital);

// Analytics
router.get("/stats", auth, isAdmin, getDashboardStats);
router.get("/appointments-per-day", auth, isAdmin, appointmentsPerDay);

module.exports = router;
