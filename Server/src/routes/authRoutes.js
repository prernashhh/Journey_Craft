const express = require('express');
const { register, login, getProfile, updateProfile, googleAuth } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth); // Add this new route
router.get('/me', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;