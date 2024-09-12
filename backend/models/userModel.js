// Path: backend/models/userModel.js

// Import mongoose to define the schema and model
const mongoose = require('mongoose');

// Define user schema
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensure email is unique
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
