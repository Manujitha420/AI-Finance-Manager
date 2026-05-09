/*Defines the structure and rules for storing financial transactions in MongoDB
 * Each transaction record stores information about money spent or earned by a user
 * Creates templates for transaction records
 * sets validation rules for each field
 * links transactions to specific users
 * */

const mongoose = require('mongoose');

/**
 * @description: Transaction Schema for MongoDB
 * Stores financial records linked to specific users
 */
const transactionSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: [true, 'Please add some text'],
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive or negative number'],
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: ['Food', 'Rent', 'Salary', 'Transport', 'Entertainment', 'Shopping', 'Health', 'Other'],
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense'], // Distinguishes between money coming in vs. out
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', // Reference to the User who owns this transaction
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Transaction', transactionSchema);
