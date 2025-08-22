const ErrorHandler = require("../utils/errorHandler");

// Function to get user-friendly error messages
const getUserFriendlyMessage = (err) => {
    // Map technical errors to user-friendly messages
    const errorMap = {
        'CastError': 'The requested item was not found. Please check and try again.',
        'JsonWebTokenError': 'Your session has expired. Please login again.',
        'ValidationError': 'Please check your input and try again.',
        'MongoNetworkError': 'Connection issue. Please try again later.',
        'MongoServerError': 'Server is currently busy. Please try again later.'
    };

    // Handle specific status codes with user-friendly messages
    if (err.statusCode === 404) {
        return 'The requested page or resource was not found.';
    }
    if (err.statusCode === 401) {
        return 'Please login to access this feature.';
    }
    if (err.statusCode === 403) {
        return 'You do not have permission to access this feature.';
    }
    if (err.statusCode === 500) {
        return 'Something went wrong on our end. Please try again later.';
    }

    // Return mapped message or original message for custom errors
    return errorMap[err.name] || err.message || 'Something went wrong. Please try again.';
};

module.exports = (err, req, res , next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong Mongodb Id error for product 
    if (err.name === "CastError") {
        const message = `The requested item was not found. Please check and try again.`;
        err = new ErrorHandler(message, 404);
    }

    // Mongoose duplicate key error
    if (err.code === 11000) { 
        const fieldName = Object.keys(err.keyValue)[0];
        let message = `This ${fieldName} is already in use. Please choose a different one.`;
        
        // Special handling for email duplicates
        if (fieldName === 'email') {
            message = 'An account with this email already exists. Please use a different email or try logging in.';
        }
        err = new ErrorHandler(message, 400);
    }

    // Wrong JWT error
    if (err.name === "JsonWebTokenError"){
        const message = `Your session has expired. Please login again.`;
        err = new ErrorHandler(message , 401);
    }

    // JWT Token Expired Error
    if (err.name === "TokenExpiredError") {
        const message = `Your session has expired. Please login again.`;
        err = new ErrorHandler(message, 401);
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message).join('. ');
        err = new ErrorHandler(message, 400);
    }

    // Get user-friendly message
    const userFriendlyMessage = getUserFriendlyMessage(err);

    // Send error response to user with user-friendly message
    res.status(err.statusCode).json({
        success: false,
        message: userFriendlyMessage,
    });
};