const express = require("express");
const { upsertAddress, getAddresses, deleteAddress } = require("../controllers/address");
const { verifyToken } = require("../middlewares/verifyToken")
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const router = express.Router();

router.patch("/", verifyToken, verifyRoles(ROLES.USER), upsertAddress);
router.get('/', verifyToken, verifyRoles(ROLES.USER), getAddresses);
router.delete("/:id", verifyToken, verifyRoles(ROLES.USER), deleteAddress);

module.exports = router;