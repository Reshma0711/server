const express= require("express")
const { addProduct,getProducts, productPagination, updateProducts } = require("../controllers/products")
const router = express.Router()

router.get("/",getProducts)
router.post("/addProduct",addProduct)
router.get("/productPagination",productPagination)
router.put("/updateProducts",updateProducts)


module.exports = router;