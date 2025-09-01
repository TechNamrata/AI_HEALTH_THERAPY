const User = require('../models/User');

// @desc    Save onboarding data
// @route   POST /api/onboarding
exports.saveOnboardingData = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            user.healthProfile = {
                gender: req.body.gender,
                age: req.body.age,
                height: req.body.height,
                weight: req.body.weight,
                bmi: req.body.bmi,
                diseases: req.body.diseases
            };
            user.onboarded = true;
            await user.save();
            res.status(200).json({ message: 'Profile updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get current user's data
// @route   GET /api/user
exports.getUser = async (req, res) => {
    try {
        // req.user is attached from the protect middleware
        if (req.user) {
            res.json({
                username: req.user.username
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};