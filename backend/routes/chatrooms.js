const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const { addChatroom, getChatrooms } = require("../controllers/chatroom");
const router = express.Router();

router.post("/", verifyToken, verifyRoles(ROLES.USER), addChatroom);
router.get("/:userId", verifyToken, verifyRoles(ROLES.USER), getChatrooms);

module.exports = router;
