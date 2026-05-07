/*
 * Protects private routes by checking if the user has a valid JWT token
 * If valid token exists, attach user data to the request so controllers can access it
 * If no token or invalid token, reject the request with 401 error
 */

/* 
 * What this does:
 * 1. Look for token in Authorization header (format: "Bearer tokenXXX")
 * 2. Extract the token from the header
 * 3. Verify token is valid using JWT_SECRET
 * 4. Find user in database using the decoded user ID
 * 5. Attach user to req.user (available in controllers)
 * 6. Allow request to proceed to controller
 * 
 * If anything fails: Return 401 error (not authorized)
 */


const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @desc    Protect routes - verify JWT token and authenticate user
 * @param   {Object} req - Request object
 * @param   {Object} res - Response object  
 * @param   {Function} next - Move to next middleware/controller
 */


const protect = async (req, res, next) => {
    let token;

    // Check if token exists in the Authorization header (Bearer token)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extract the token (format: "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach the user object (without password) to the request for subsequent handlers
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Move to the next middleware or controller
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized' });
        }
    }

    // If no token was found
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
