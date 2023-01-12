const express = require("express");
const router = express.Router();
const { signup, login, getAllUsers, deleteUser, getProfile} = require("../controllers/User");
const { signupValidator, loginValidator, validate, } = require("../middlewares/validator");
const { authCheck } = require("../middlewares/authMiddleware");
const { adminCheck } = require("../middlewares/adminMiddleware");


router.post("/signup", signupValidator, validate, signup);
router.post("/login", loginValidator, validate, login);
router.get("/allUsers", authCheck, adminCheck, getAllUsers);
router.get("/getprofile/:username", authCheck, getProfile);
router.delete("/deleteuser/:id", authCheck, adminCheck, deleteUser);

module.exports = router;