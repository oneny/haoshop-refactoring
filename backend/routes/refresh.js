const express = require('express');
const { handleRefreshToken } = require('../controllers/refreshtoken');
const router = express.Router();

router.post("/", handleRefreshToken)

module.exports = router;