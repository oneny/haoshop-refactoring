const express = require("express");
const { addLookbook, getLookbooks, getLookbook, deleteLookbook, updateLookbook, getAllLookbooks, getNewLookbooks } = require("../controllers/lookbook");
const { upload } = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/verifyToken")
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const router = express.Router();

router.post("/", verifyToken, verifyRoles(ROLES.ADMIN), upload.fields([{name: 'banners'}]), addLookbook);
router.patch("/", verifyToken, verifyRoles(ROLES.ADMIN), upload.fields([{name: 'banners'}]), updateLookbook);
router.delete("/:id", verifyToken, verifyRoles(ROLES.ADMIN), deleteLookbook);
router.get("/", verifyToken, verifyRoles(ROLES.ADMIN), getAllLookbooks);
router.post("/get", getLookbooks)
router.get("/new",  getNewLookbooks);
router.get("/:id", getLookbook);

module.exports = router;
