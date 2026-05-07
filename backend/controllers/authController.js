/* This controller manages JWT token generation and user credintial validation  */
/* -jsonwebtoken: Used for creating and verifying JWT tokens
 * - User Model: Database model for user data persistence and password hashing */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 * @param   {object} req - Request object containing user data (body: name, email, password)
 * @param   {object} res - Response object for sending HTTP response to client
 */
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    // Check if user already exists in the database
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user (password is hashed automatically by model middleware)
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        // Respond with user data and a fresh JWT token
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

/**
 * @desc    Authenticate a user (Login)
 * @route   POST /api/auth/login
 * @access  Public
 * @param   {object} req - Request object containing user data (body: email, password)
 * @param   {object} res - Response object for sending HTTP response to client
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Find user by email and explicitly include the password field for comparison
    const user = await User.findOne({ email }).select('+password');

    // Verify user exists and the password matches the hash
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

/**
 * @desc    Get currently logged-in user's profile
 * @route   GET /api/auth/me
 * @access  Private (Requires Auth Token)
 * @param   {object} req - Request object containing user data (body: email, password)
 * @param   {object} res - Response object for sending HTTP response to client
 */
const getMe = async (req, res) => {
    // req.user is populated by the auth middleware
    res.status(200).json(req.user);
};

/**
 * @description Helper function to generate a JWT token
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token remains valid for 30 days
    });
};

// Export all authentication controller functions for use in route definitions
module.exports = {
    registerUser,
    loginUser,
    getMe,
};
