/* Handles all AI-related business logic Connects to Google Gemini AI API to analyze user's financial transactions Generates personalized financial insights and advice 
* Fetches user's recent transactions from database 
* Formats transaction data into readable text
* Sends data to Google Gemini AI with instructions
* Receives AI-generated financial insights
* Returns insights to the controller
*/

const { GoogleGenerativeAI } = require('@google/generative-ai');
const Transaction = require('../models/Transaction');

/**
 * @description: Service to interact with Gemini AI
 * Analyzes user transactions and returns personalized financial advice
 */
const getAIInsights = async (userId) => {
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
        return "AI Insights are currently unavailable. Please configure your API key.";
    }

    // Initialize the Gemini AI SDK
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Fetch the user's recent transactions (last 50) for analysis
    const transactions = await Transaction.find({ user: userId }).limit(50).sort({ createdAt: -1 });

    // Return a friendly message if there's no data to analyze yet
    if (transactions.length === 0) {
        return "Start adding transactions to get personalized AI insights on your spending!";
    }

    // Convert transaction data into a readable string format for the AI prompt
    const dataString = transactions.map(t => `${t.type}: ${t.amount} in ${t.category} (${t.text})`).join('\n');

    // Prepare the prompt for Gemini
    const prompt = `
    As a financial advisor AI, analyze the following transactions and provide a short, actionable insight (max 2-3 sentences).
    Focus on patterns, potential savings, or warnings.
    
    Transactions:
    ${dataString}
    
    Response format: Just the insight text.
  `;

    try {
        // Call Gemini API to generate the insight
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API Error:', error);
        return "I'm having trouble analyzing your data right now. Try again later!";
    }
};

module.exports = { getAIInsights };
