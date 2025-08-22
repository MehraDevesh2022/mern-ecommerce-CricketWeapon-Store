const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Log error details for debugging
    console.error('=== ERROR DETAILS ===');
    console.error('Timestamp:', new Date().toISOString());
    console.error('Method:', req.method);
    console.error('URL:', req.originalUrl);
    console.error('IP:', req.ip || req.connection.remoteAddress);
    console.error('User Agent:', req.get('User-Agent'));
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);
    console.error('Stack Trace:', err.stack);
    console.error('=====================');

    // Wrong Mongodb Id error for product 
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    // Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again`;
        err = new ErrorHandler(message, 400);
    }

    // JWT token expired error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is expired, Try again`;
        err = new ErrorHandler(message, 401);
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(value => value.message);
        err = new ErrorHandler(message, 400);
    }

    // sending error response to user.
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};