const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const { upload } = require("../middlewares/multer");
const { getUser, getUsers, deleteUser, updateUser, getUserStats } = require("../controllers/user");
const router = express.Router();

router.patch("/", verifyToken, verifyRoles(ROLES.ADMIN), upload.single("profileImg"), updateUser)
router.delete("/:id", verifyToken, verifyRoles(ROLES.ADMIN), deleteUser)
// router.get("/", verifyToken, verifyRoles(ROLES.ADMIN), getUsers)
router.post("/get", verifyToken, verifyRoles(ROLES.ADMIN), getUsers)
router.get("/stats",  verifyToken, verifyRoles(ROLES.ADMIN), getUserStats)

router.get("/id", verifyToken, verifyRoles(ROLES.USER), getUser)

module.exports = router;