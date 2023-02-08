const express = require("express");

const router = express.Router();
 
 
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails,  } = require("../controller/userConttroler");
const { isAuthentictedUser } = require("../middleWare/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/reset/:token").put(resetPassword);
router.route("/profile").get(isAuthentictedUser , getUserDetails);
router.route("/password/forgot").post(forgotPassword)
module.exports = router;