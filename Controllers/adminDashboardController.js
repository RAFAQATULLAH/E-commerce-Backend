const Order = require("../model/Order.js") ;

const getDashboardStats = async (req, res) => {
  try {
    const [totalOrders, earningsResult] = await Promise.all([
      Order.countDocuments(),

      Order.aggregate([
        {
          $match: {
            orderStatus: { $ne: "Cancelled" },
          },
        },
        {
          $group: {
            _id: null,
            totalEarnings: { $sum: "$totalAmount" },
          },
        },
      ]),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalOrders,
        totalEarnings: earningsResult[0]?.totalEarnings || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};
module.exports={getDashboardStats}