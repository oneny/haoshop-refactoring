const express = require("express");
const { getCartItems, addCartItems, updateCartItems } = require("../controllers/cart");
const { verifyToken } = require("../middlewares/verifyToken")
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const router = express.Router();


router.post("/", verifyToken, verifyRoles(ROLES.USER), addCartItems);
router.put("/", verifyToken, verifyRoles(ROLES.USER), updateCartItems)
router.get("/", verifyToken, verifyRoles(ROLES.USER), getCartItems);

module.exports = router;