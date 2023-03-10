const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controller/paymentController");
const { isAuthentictedUser } = require("../middleWare/auth");
const router  = express.Router();



router.route("/payment/process").post(isAuthentictedUser , processPayment);

router.route("/stripeapikey").get(isAuthentictedUser,  sendStripeApiKey);

module.exports = router