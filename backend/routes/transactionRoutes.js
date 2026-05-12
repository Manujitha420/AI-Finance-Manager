/* Defines all API endpoints for managing financial transactions Handles creating, reading, updating, and deleting transactions
* Creates route definitions for transaction endpoints
* Applies authentication middleware (protect) to all routes (all private)
* Connects routes to controller functions
* Uses route grouping to organize similar endpoints
* Exports routes to be used in main application
* Important: ALL transaction routes require authentication (JWT token) Users can only access their own transactions
*/

const express = require('express');
const router = express.Router();
const {
    getTransactions,
    setTransaction,
    updateTransaction,
    deleteTransaction,
} = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @route   GET & POST /api/transactions
 * GET: Retrieves all transactions for the user
 * POST: Adds a new transaction for the user
 * Note: All routes here are protected and require a valid JWT token
 */
router.route('/')
    .get(protect, getTransactions)
    .post(protect, setTransaction);

/**
 * @route   DELETE & PUT /api/transactions/:id
 * DELETE: Removes a specific transaction
 * PUT: Updates details of a specific transaction
 */
router.route('/:id')
    .delete(protect, deleteTransaction)
    .put(protect, updateTransaction);

module.exports = router;
