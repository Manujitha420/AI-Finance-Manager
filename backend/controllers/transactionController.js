/*
 * This controller manages user transactions including CRUD operations
 * All operations are user-specific and require authentication.
 */

const Transaction = require('../models/Transaction');

/**
 * @desc    Get all transactions for the authenticated user
 * @route   GET /api/transactions
 * @access  Private
 */
const getTransactions = async (req, res) => {
    // Find transactions belonging to the current user, sorted by newest first
    const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json(transactions);
};

/**
 * @desc    Create a new transaction
 * @route   POST /api/transactions
 * @access  Private
 */
const setTransaction = async (req, res) => {
    const { text, amount, category, type } = req.body;

    // Basic validation
    if (!text || !amount || !category || !type) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    // Create transaction and link it to the authenticated user's ID
    const transaction = await Transaction.create({
        text,
        amount,
        category,
        type,
        user: req.user.id,
    });

    res.status(201).json(transaction);
};

/**
 * @desc    Update an existing transaction
 * @route   PUT /api/transactions/:id
 * @access  Private
 */
const updateTransaction = async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    // Check if transaction exists
    if (!transaction) {
        return res.status(400).json({ message: 'Transaction not found' });
    }

    // Security check: Ensure the user owns this transaction before updating
    if (transaction.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    // Perform update
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Return the modified document rather than the original
    });

    res.status(200).json(updatedTransaction);
};

/**
 * @desc    Delete a transaction
 * @route   DELETE /api/transactions/:id
 * @access  Private
 */
const deleteTransaction = async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
        return res.status(400).json({ message: 'Transaction not found' });
    }

    // Security check: Ensure the user owns this transaction before deleting
    if (transaction.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    // Remove transaction from database
    await transaction.deleteOne();

    res.status(200).json({ id: req.params.id });
};

// Export all transaction controller functions for use in route definitions
module.exports = {
    getTransactions,
    setTransaction,
    updateTransaction,
    deleteTransaction,
};
