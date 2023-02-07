const express = require("express");

const router = express.Router();
 
 
const { registerUser } = require("../controller/userConttroler");

router.route("/register").post(registerUser);


module.exports = router;