const express = require("express");
const router = express.Router();
const { adminSignin, signup, signin, forgotPassword, resetPassword, signout, matchEmail, matchPassword, updateProfile, kakao } = require("../controllers/auth");
const { validateSignup, isValidated, validateSignin } = require("../middlewares/validator");
const { verifyToken } = require("../middlewares/verifyToken")
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");

// ADMIN
router.post("/admin/signin", validateSignin, isValidated, adminSignin)

//카카오
router.get("/kakao", kakao);

// 공통
router.post("/signin", validateSignin, isValidated, signin);
router.post("/signup", validateSignup, isValidated, signup);
router.get("/signout", signout);
router.post("/forgot_password", forgotPassword);
router.put("/reset_password", resetPassword);

// 체크
router.get("/:email", matchEmail)
router.post("/pwcheck", validateSignin, isValidated, matchPassword);

// 업데이트
router.post("/update", verifyToken, verifyRoles(ROLES.USER), updateProfile);

module.exports = router;
