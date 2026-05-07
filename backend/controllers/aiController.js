/* AI controller manages the endpoint for retrieving AI-generated financial insights.
 */

const { getAIInsights } = require('../services/aiService');

/**
 * @desc    Get AI-generated financial insights for the user
 * @route   GET /api/ai/insights
 * @access  Private
 */
const getInsights = async (req, res) => {
    try {
        // Call the AI service to process user data
        const insights = await getAIInsights(req.user.id);

        // Return the generated insight text
        res.status(200).json({ insights });
    } catch (error) {
        console.error('Insight Generation Error:', error);
        res.status(500).json({ message: 'Error generating insights' });
    }
};

module.exports = { getInsights };
