const express  = require("express");
const router  = express.Router();

const { getAllProducts , createProduct, updateProduct, deleteProduct, getSingleProduct} = require("../controller/productController");
const { isAuthentictedUser } = require("../middleWare/auth");
router.route("/product").get(isAuthentictedUser ,getAllProducts).post(createProduct);
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getSingleProduct)

module.exports = router