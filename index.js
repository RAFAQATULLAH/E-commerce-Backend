const express=require('express');
const auth=require('./routes/auth');
const dotenv=require('dotenv');
const dbConnected = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const cors = require('cors');
const orderRoutes = require("./routes/orderRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");
const userRoutes =require("./routes/userRoutes.js");
const cookieParser = require("cookie-parser");
const { getDashboardStats } = require('./Controllers/adminDashboardController.js');
const app=express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

dotenv.config();

dbConnected();



app.use('/api/admin',auth)
app.use("/api/products", productRoutes, getDashboardStats);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/",(req,res)=>{
res.get("Welcome to the E-commerce API");
})

const port=process.env.PORT;
app.listen(port,()=>{
console.log('server is running at port ' +port);

})