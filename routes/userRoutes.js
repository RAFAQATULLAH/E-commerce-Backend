const express =require("express") ;
const { getAllUsers } =require("../Controllers/userController") ;
const { protectAdmin } =require("../Middlewears/authMiddleware") ;

const router = express.Router();

router.get("/", protectAdmin, getAllUsers);

module.exports=router;