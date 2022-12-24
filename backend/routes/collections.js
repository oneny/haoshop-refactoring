const express = require("express");
const { addCollection, getCollections, getCollection, deleteCollection, updateCollection, getAllCollections } = require("../controllers/collection");
const { upload } = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/verifyToken")
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const router = express.Router();

router.post("/", verifyToken, verifyRoles(ROLES.ADMIN), upload.fields([{name: 'banners'},{name:'cards'}]), addCollection);
router.patch("/", verifyToken, verifyRoles(ROLES.ADMIN), upload.fields([{name: 'banners'},{name:'cards'}]), updateCollection);
router.delete("/:id", verifyToken, verifyRoles(ROLES.ADMIN), deleteCollection);
router.get("/", verifyToken, verifyRoles(ROLES.ADMIN), getAllCollections);
router.post("/get", getCollections);
router.get("/:id", getCollection);

module.exports = router;
