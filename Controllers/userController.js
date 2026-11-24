const User =require("../model/User") ;

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("_id name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalUsers: users.length,
      users,
    });

  } catch (error) {
    console.error("Get Users Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

module.exports={
    getAllUsers,
}