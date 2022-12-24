const express = require("express");
const { getReview, getReviewsByUserId, deleteReview, getReviewsByProductId, upsertReview } = require("../controllers/review");
const { upload } = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const router = express.Router();

router.post('/', verifyToken, verifyRoles(ROLES.USER), upload.fields([{name: 'reviewImgs'}]), upsertReview);
router.post("/get", verifyToken, verifyRoles(ROLES.USER), getReviewsByUserId )
router.get("/:id", verifyToken, verifyRoles(ROLES.USER), getReview)
router.post('/getByProductId', getReviewsByProductId);
router.delete("/:id", verifyToken, verifyRoles(ROLES.USER), deleteReview)

module.exports = router;