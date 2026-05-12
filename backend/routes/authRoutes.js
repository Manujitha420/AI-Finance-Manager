/* Defines all API endpoints related to user authentication Handles user registration, login, and profile retrieval
* Creates route definitions for auth endpoints
* Connects routes to controller functions
* Applies authentication middleware where needed (protect)
* Exports routes to be used in main application
*/


const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// @route: POST /api/auth/register
// Registers a new user account
router.post('/register', registerUser);

// @route: POST /api/auth/login
// Authenticates user and returns a JWT token
router.post('/login', loginUser);

// @route: GET /api/auth/me
// Retrieves current user profile (Requires authentication)
router.get('/me', protect, getMe);

module.exports = router;
