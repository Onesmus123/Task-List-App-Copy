// Path: backend/index.js

// Import necessary modules
const express = require('express'); // Import express to create the server
const cors = require('cors');
const dotenv = require('dotenv'); // Import dotenv to manage environment variables
const connectDB = require('./config/db'); // Import database connection function
const { errorHandler } = require('./middleware/errorMiddleware'); // Import error handling middleware
const taskRoutes = require('./routes/taskRoutes'); // Import task routes
const userRoutes = require('./routes/userRoutes'); // Import user routes

// Initialize dotenv to load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create an express application
const app = express();

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/tasks', taskRoutes); // Route for task-related endpoints
app.use('/api/users', userRoutes); // Route for user-related endpoints

// Use error handling middleware
app.use(errorHandler);

// Set the port and start the server
const PORT = process.env.PORT || 5000; // Default port to 5000 if not specified
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
