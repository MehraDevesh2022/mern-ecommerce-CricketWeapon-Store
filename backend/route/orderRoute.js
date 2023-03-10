const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controller/orderController");
const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");
const router = express.Router();
 
router.route("/order/new").post( isAuthentictedUser, newOrder);
router.route("/order/:id").get(isAuthentictedUser , getSingleOrder);
router.route("/orders/myOrders").get(isAuthentictedUser , myOrders)
router.route("/admin/orders").get(isAuthentictedUser , authorizeRoles("admin") ,getAllOrders);
router.route("/admin/order/:id").put(isAuthentictedUser , authorizeRoles("admin") , updateOrder).delete(deleteOrder);


module.exports = router;
