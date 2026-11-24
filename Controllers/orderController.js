const Order = require("../model/Order");
const Product = require("../model/Product");

const placeOrder = async (req, res) => {
  try {
    const { items, customer } = req.body;

    // Validate checkout information
    if (
      !customer?.name ||
      !customer?.email ||
      !customer?.phone ||
      !customer?.address
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all customer details",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    // Get actual product information from MongoDB
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid product quantity",
        });
      }

      totalAmount += product.price * quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images?.img1 || "",
        price: product.price,
        quantity,
        size: item.size || "",
        color: item.color || "",
      });
    }

    // Save order in MongoDB
    const order = await Order.create({
      user: req.user._id,
      customer,
      items: orderItems,
      totalAmount,
      paymentMethod: "COD",
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
  console.error("PLACE ORDER ERROR:", error.stack);

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

// My Orders API
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
};