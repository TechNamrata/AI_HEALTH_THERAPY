const express = require('express');
const router = express.Router();
const { saveOnboardingData, getUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/onboarding', protect, saveOnboardingData);
router.get('/user', protect, getUser);

module.exports = router;