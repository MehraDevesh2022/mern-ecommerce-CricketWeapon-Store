const express = require("express");

const router = express.Router();
 
    
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, deleteUser, updateUserRole,  } = require("../controller/userConttroler");
const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/reset/:token").put(resetPassword);
router.route("/profile").get(isAuthentictedUser , getUserDetails);
router.route("/password/forgot").post(forgotPassword);

router.route("/password/update").put(isAuthentictedUser, updatePassword);
router.route("/profile/update").put(isAuthentictedUser ,updateProfile);
router.route("/admin/users").get(isAuthentictedUser , authorizeRoles("admin") ,getAllUser);

router.route("/admin/user/:id").get(isAuthentictedUser , authorizeRoles("admin") , getSingleUser).put(isAuthentictedUser , authorizeRoles("admin") , updateUserRole).delete(isAuthentictedUser , authorizeRoles("admin") , deleteUser)

module.exports = router;