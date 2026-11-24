const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
} = require("../Controllers/orderController");

const {protectUser} = require("../Middlewears/userAuthMiddleware");

// Place new order
router.post("/place", protectUser, placeOrder);

// Get logged-in customer's orders
router.get("/my-orders", protectUser, getMyOrders);

module.exports = router;