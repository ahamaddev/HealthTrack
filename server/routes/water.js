const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { addWater, getTodayWater, waterValidation } = require('../controllers/waterController');

// All water routes are protected
router.post('/add', protect, waterValidation, addWater);
router.get('/today', protect, getTodayWater);

module.exports = router;
