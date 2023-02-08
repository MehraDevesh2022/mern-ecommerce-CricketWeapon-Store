const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res , next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

 
     // Wrong Mongodb Id error for product 
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

   // Mongoose duplicate key error
    if (err.code === 11000) { // when user value id dupictae eg: same email available in data base then user cant register with that id 
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }
     // Wrong JWT error
    if (err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, Try again `;
        err = new ErrorHandler(message , 400); // bad req 400
    }

  

// sending error response to user.
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};