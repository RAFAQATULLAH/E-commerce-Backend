const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMyProfile,
  logoutUser,
} = require("../Controllers/authController");

const {protectUser} = require("../Middlewears/userAuthMiddleware");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Protected route
router.get("/me", protectUser, getMyProfile);

module.exports = router;