// this class take error msg and status code for error
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor);

    }

}

module.exports = ErrorHandler