const express = require("express");
// const { signUp, accessPage, logIn } = require("../controllers/user");
const userController = require("../controllers/user");
const { productPagination } = require("../controllers/products");
const { verifyToken } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);

// router.get("/securePath",verifyToken)

// router.get("/securePath",verifyToken,access);

router.get("/successpage", verifyToken, userController.accessPage);

// router.get("/deniedPage",deniedPage)

module.exports = router;
