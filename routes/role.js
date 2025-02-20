const { admin,manager,user} = require("../controllers/role")
const express=require("express")
const router=express.Router()
const {verifyToken }= require("../middlewares/authmiddleware")
const {verifyRole}=require("../middlewares/rolemiddleware")


router.get("/admin",verifyToken,verifyRole(["admin"]),admin)

router.get("/employee",verifyToken,verifyRole(["admin","manager"]),manager)

router.get("/user",verifyToken,verifyRole(["admin","user"]),user)
  
module.exports = router;