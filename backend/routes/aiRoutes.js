/* Defines all API endpoints related to AI featuresRoutes incoming requests to the correct controller functions
 * Creates route definitions for AI endpoints
 * Applies authentication middleware (protect) to private routes
 * Connects routes to controller functions that handle the logic
 * Exports routes to be used in main application
 */

const express = require('express');
const router = express.Router();
const { getInsights } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @route   GET /api/ai/insights
 * @desc    Triggers AI analysis of user's financial data
 * @access  Private (Requires JWT token)
 */
router.get('/insights', protect, getInsights);

module.exports = router;
