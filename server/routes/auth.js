const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  register,
  login,
  getProfile,
  updateProfile,
  registerValidation,
  loginValidation,
} = require('../controllers/authController');

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;
