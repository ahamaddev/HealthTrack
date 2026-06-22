const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getDashboard } = require('../controllers/dashboardController');

// Dashboard route is protected
router.get('/', protect, getDashboard);

module.exports = router;
