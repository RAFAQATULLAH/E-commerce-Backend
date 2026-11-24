
const express = require("express");
const router = express.Router();

const {protectUser} = require("../Middlewears/userAuthMiddleware");

const {
  getCart,
  saveCart,
  clearCart,
} = require("../Controllers/cartController");

router.get("/", protectUser, getCart);
router.put("/", protectUser, saveCart);
router.delete("/", protectUser, clearCart);

module.exports = router;
