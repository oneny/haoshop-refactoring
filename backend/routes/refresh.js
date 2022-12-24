const express = require('express');
const { handleRefreshToken } = require('../controllers/refreshtoken');
const router = express.Router();

router.get("/", handleRefreshToken)

module.exports = router;