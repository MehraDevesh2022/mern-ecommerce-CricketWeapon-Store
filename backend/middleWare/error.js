const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

 
     // Wrong Mongodb Id error for product 
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

// sending error response to user.
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};