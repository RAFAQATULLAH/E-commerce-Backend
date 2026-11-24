
const express = require("express");
const router = express.Router();

const {
  setupAdmin,
  loginAdmin,
} = require("../Controllers/adminAuthController");

const { protectAdmin } = require("../Middlewears/authMiddleware");
const {getDashboardStats} = require("../Controllers/adminDashboardController");

router.post("/setup", setupAdmin);
router.post("/login", loginAdmin);
router.get("/dashboard/stats", protectAdmin, getDashboardStats);

module.exports = router;
