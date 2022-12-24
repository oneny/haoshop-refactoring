const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const { addMessage, getMessages } = require("../controllers/message");
const router = express.Router();

router.post("/", verifyToken, verifyRoles(ROLES.USER), addMessage);
router.get("/:chatroomId", verifyToken, verifyRoles(ROLES.USER), getMessages);

module.exports = router;
