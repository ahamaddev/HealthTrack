const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getRecommendations } = require('../controllers/recommendationController');

// Recommendations route is protected
router.get('/', protect, getRecommendations);

module.exports = router;
