
const Cart = require("../model/Cart");
const Product = require("../model/Product");

// GET CUSTOMER CART
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
    });
  }
};

// SAVE CUSTOMER CART
const saveCart = async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart items",
      });
    }

    const updatedItems = [];

    for (const item of items) {
      const quantity = Number(item.quantity);

      if (!item.productId || !Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid product or quantity",
        });
      }

      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      updatedItems.push({
        product: product._id,
        quantity,
        size: item.size || "",
        color: item.color || "",
      });
    }

    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      {
        $set: {
          items: updatedItems,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    ).populate("items.product");

    res.status(200).json({
      success: true,
      message: "Cart saved successfully",
      cart,
    });
  } catch (error) {
    console.error("Save cart error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save cart",
    });
  }
};

// CLEAR CUSTOMER CART
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $set: { items: [] } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to clear cart",
    });
  }
};

module.exports = {
  getCart,
  saveCart,
  clearCart,
};
