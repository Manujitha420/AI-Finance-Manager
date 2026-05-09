/* Defines the structure for storing user account information in MongoDB Handles user registration data, password security, and authentication.
 * Creates a template for user data (name, email, password)
 * Sets validation rules for each field
 * Automatically hashes passwords before saving to database (security)
 * Provides method to verify passwords during login
 */


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * @description: User Schema for MongoDB
 * Stores user credentials and profile information
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true, // Prevents duplicate registrations
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false, // Hides password by default in API responses
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

/**
 * @description: Pre-save middleware to hash password
 * Automatically runs before saving a user document to the database
 */
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        next();
    }
    // Generate a salt and hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

/**
 * @description: Instance method to check password validity
 * Compares the entered plain-text password with the hashed password in DB
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
