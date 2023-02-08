const express  = require("express");
const router  = express.Router();

const { getAllProducts , createProduct, updateProduct, deleteProduct, getSingleProduct} = require("../controller/productController");
const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");
router.route("/product").get(getAllProducts).post(isAuthentictedUser, authorizeRoles("admin"), createProduct);
router.route("/product/:id").put(isAuthentictedUser, authorizeRoles("admin"), updateProduct).delete(isAuthentictedUser, authorizeRoles("admin"), deleteProduct).get(getSingleProduct)

module.exports = router  