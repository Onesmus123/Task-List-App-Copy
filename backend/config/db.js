// Path: backend/config/db.js

// Import mongoose to define the schema and model
const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI from environment variables
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Remove deprecated options
            // The new MongoDB driver defaults should handle connection behavior
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`); // Log successful connection
    } catch (error) {
        console.error(`Error: ${error.message}`); // Log connection error
        process.exit(1); // Exit the process if connection fails
    }
};

module.exports = connectDB; // Export the function to be used in other files
