// Path: backend/middleware/errorMiddleware.js

// Middleware to handle errors
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Set status code
    res.status(statusCode).json({
        message: err.message, // Send error message
        stack: process.env.NODE_ENV === 'development' ? err.stack : null, // Send stack trace in development mode
    });
};

module.exports = { errorHandler };
