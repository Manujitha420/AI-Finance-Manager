/* Main Server File 
 * Sets up and starts the Express web server, This is the main file that runs when you start the backend
 * Loads environment variables from .env file
 * Connects to MongoDB database
 * Creates Express application
 * Sets up middleware (JSON parsing, CORS)
 * Registers all API routes
 * Starts the server on a specific port
 */

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// @description: Load environment variables from .env file
dotenv.config();

// @description: Database connection function using Mongoose
const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI from environment variables
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Log error and exit process if connection fails
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// @description: Initialize database connection if URI is present
if (process.env.MONGODB_URI) {
    connectDB();
} else {
    console.warn('MONGODB_URI not found in environment. Database connection skipped.');
}

// @description: Initialize Express application
const app = express();

// @description: Middleware to parse incoming JSON requests
app.use(express.json());

// @description: Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// @description: Define API routes
// Auth routes for registration and login
app.use('/api/auth', require('./routes/authRoutes'));
// Transaction routes for CRUD operations
app.use('/api/transactions', require('./routes/transactionRoutes'));
// AI routes for spending insights
app.use('/api/ai', require('./routes/aiRoutes'));

// @description: Root endpoint to check API status
app.get('/', (req, res) => {
    res.send('API is running...');
});

// @description: Define server port (default to 5001)
const PORT = process.env.PORT || 5001;

// @description: Start the Express server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
