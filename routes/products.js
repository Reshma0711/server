const express = require("express");
const {
  addProduct,
  getProducts,
  productPagination,
  updateProducts,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/products");
const router = express.Router();
const { verifyToken } = require("../middlewares/authmiddleware");
const { verifyRole } = require("../middlewares/rolemiddleware");

router.get(
  "/",
  verifyToken,
  verifyRole(["admin", "manager", "user"]),
  getProducts
);

// router.post("/addProduct", addProduct);

// console.log("verifyToken type:", typeof verifyToken); // Should be 'function'
// console.log("verifyRole type:", typeof verifyRole); // Should be 'function'

// Create a new product (Only admin or manager)
router.post("/add", verifyToken, verifyRole(["admin", "manager"]), addProduct);

// Update a product (Only admin or manager)
// router.put(
//   "/:id",
//   verifyToken,
//   verifyRole(["admin", "manager"]),
//   updateProduct
// );
// Delete a product (Only admin)
router.delete("/:id", verifyToken, verifyRole(["admin"]), deleteProduct);

// Route to get a particular product by ID
router.get("/:id", verifyToken, verifyRole(["admin", "manager","user"]), getProductById);

router.get("/productPagination", productPagination);
router.put("/updateProducts", updateProducts);

module.exports = router;
