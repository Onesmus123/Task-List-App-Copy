// Path: backend/models/taskModel.js

// Import mongoose to define the schema and model
const mongoose = require('mongoose');

// Define task schema
const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        deadline: {
            type: Date,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Reference to the User model
        },
        status: {
            type: String,
            enum: ['in-progress', 'completed'], // Define possible statuses
            required: true,
            default: 'in-progress', // Add status field with a default value
        }
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Create and export the Task model
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
