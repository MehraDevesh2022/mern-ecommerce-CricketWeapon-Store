const express  = require("express");
const router  = express.Router();

const { getAllProducts , createProduct, updateProduct, deleteProduct, getSingleProduct} = require("../controller/productController")
router.route("/product").get(getAllProducts).post(createProduct);
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getSingleProduct)

module.exports = router