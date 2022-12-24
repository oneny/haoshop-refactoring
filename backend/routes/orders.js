const express = require("express");
const { addOrder, getOrder, getOrders, updateOrderStatus, getOrderStats, refundRequest, getMonthlyIncome, getOrdersForAdmin } = require("../controllers/order");
const { verifyToken } = require("../middlewares/verifyToken")
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const router = express.Router();

router.patch("/",  verifyToken, verifyRoles(ROLES.ADMIN), updateOrderStatus)
router.post("/getAdmin", verifyToken, verifyRoles(ROLES.ADMIN), getOrdersForAdmin)
router.get("/income", verifyToken, verifyRoles(ROLES.ADMIN), getMonthlyIncome);



router.post("/", verifyToken, verifyRoles(ROLES.USER), addOrder);
router.post("/get", verifyToken, verifyRoles(ROLES.USER), getOrders);
router.get("/stats", verifyToken, verifyRoles(ROLES.USER), getOrderStats);
router.get("/:id", verifyToken, verifyRoles(ROLES.USER), getOrder);
router.post("/refund", verifyToken, verifyRoles(ROLES.USER), refundRequest)



module.exports = router;
