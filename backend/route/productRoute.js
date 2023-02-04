const express  = require("express");
const router  = express.Router();

const { getAllProducts , createProduct, updateProduct, deleteProduct} = require("../controller/productController")
router.route("/product").get(getAllProducts).post(createProduct);
router.route("/product/:id").put(updateProduct).delete(deleteProduct)

module.exports = router