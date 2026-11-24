
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    images: {
      img1: { type: String, required: true },
      img2: { type: String, default: "" },
      img3: { type: String, default: "" }
    },

    rating: {
      type: Number,
      default: 0
    },

    price: {
      type: Number,
      required: true
    },

    colors: {
      type: [String],
      default: []
    },

    sizes: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
