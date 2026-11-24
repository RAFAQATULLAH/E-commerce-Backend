
const express = require("express");
const router = express.Router();

const { addProduct, getAllProducts, getSingleProduct } = require("../Controllers/productController");
const { protectAdmin} = require("../Middlewears/authMiddleware");

router.post("/add", protectAdmin, addProduct);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

module.exports = router;
