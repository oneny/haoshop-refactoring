const express = require("express");
const { addCategory, getCategories, updateCategories, deleteCategories } = require("../controllers/category");
const { upload } = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/verifyToken")
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const router = express.Router();

router.post("/", verifyToken, verifyRoles(ROLES.ADMIN), upload.single("categoryImg"), addCategory);
router.patch("/", verifyToken, verifyRoles(ROLES.ADMIN), upload.array("categoryImg"), updateCategories);
router.put("/", verifyToken, verifyRoles(ROLES.ADMIN), deleteCategories);
router.get("/", getCategories);

module.exports = router;
