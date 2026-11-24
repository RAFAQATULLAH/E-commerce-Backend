
const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  getOrderById,
  markOrderDelivered,
} = require("../Controllers/adminOrderController");

const { protectAdmin } = require("../Middlewears/authMiddleware");

router.get("/", protectAdmin, getAllOrders);
router.get("/:id", protectAdmin, getOrderById);
router.patch("/:id/deliver", protectAdmin, markOrderDelivered);

module.exports = router;
