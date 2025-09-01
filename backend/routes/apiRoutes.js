const express = require('express');
const router = express.Router();
const { analyzeHealth } = require('../controllers/apiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/analyze', protect, analyzeHealth);

module.exports = router;