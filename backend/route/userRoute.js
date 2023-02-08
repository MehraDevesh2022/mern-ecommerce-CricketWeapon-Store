const express = require("express");

const router = express.Router();
 
 
const { registerUser, loginUser, logoutUser } = require("../controller/userConttroler");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
module.exports = router;