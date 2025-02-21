const express = require("express");
const router = express.Router();
const {
  userCart,
  add,
  delProduct,
  decPrdCount,
  delCart,
  testCart,
} = require("../controllers/cart");
const { verifyToken } = require("../middlewares/authmiddleware");
const { verifyRole } = require("../middlewares/rolemiddleware");

// Get user's cart (Only users)
router.get("/", verifyToken, verifyRole(["user"]), userCart);

router.post("/add", verifyToken, verifyRole(["user"]), add);

router.delete("/:id", verifyToken, verifyRole(["user"]), delProduct);

router.patch("/decrease/:id", verifyToken, verifyRole(["user"]), decPrdCount);

router.delete("/", verifyToken, verifyRole(["user"]), delCart);

// router.post("/test",verifyToken,verifyRole(["user"]), testCart);

module.exports = router;
