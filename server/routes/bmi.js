const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { saveBMI, getBMIHistory, bmiValidation } = require('../controllers/bmiController');

// All BMI routes are protected
router.post('/save', protect, bmiValidation, saveBMI);
router.get('/history', protect, getBMIHistory);

module.exports = router;
