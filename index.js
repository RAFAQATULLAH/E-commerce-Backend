const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const dbConnected = require("./config/db");

const auth = require("./routes/auth");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");
const userRoutes = require("./routes/userRoutes");

const {
  getDashboardStats,
} = require("./Controllers/adminDashboardController");

const { protectAdmin } = require("./Middlewears/authMiddleware");

const app = express();

// CORS
const corsOptions = {
  origin: [
    "https://e-commerce-admin-dashboard-wheat.vercel.app/",
    "https://shopco-blond-three.vercel.app/",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SHOP.CO Backend API is running successfully 🚀",
  });
});

// Database connection middleware
app.use(async (req, res, next) => {
  try {
    await dbConnected();
    next();
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// Admin routes
app.use("/api/admin", auth);

app.get(
  "/api/admin/dashboard/stats",
  protectAdmin,
  getDashboardStats
);

// Product routes
app.use("/api/products", productRoutes);

// Customer routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// Admin order routes
app.use("/api/admin/orders", adminOrderRoutes);

// Export Express app for Vercel
module.exports = app;

// Allow the same file to run locally with `npm start`.
if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}
