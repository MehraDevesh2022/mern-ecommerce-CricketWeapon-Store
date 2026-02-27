/**
 * Custom Error Handler class for production-ready error management.
 * Extends the native Error class with statusCode and errorCode support.
 */
class ErrorHandler extends Error {
  constructor(message, statusCode, errorCode = null) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true; // distinguishes operational errors from programming errors

    Error.captureStackTrace(this, this.constructor);
  }
}

// Centralized error codes for consistent frontend handling
ErrorHandler.CODES = {
  // Auth errors
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  TOKEN_INVALID: "TOKEN_INVALID",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",

  // Resource errors
  NOT_FOUND: "NOT_FOUND",
  DUPLICATE_ENTRY: "DUPLICATE_ENTRY",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_ID: "INVALID_ID",

  // Payment errors
  PAYMENT_FAILED: "PAYMENT_FAILED",
  PAYMENT_AMOUNT_INVALID: "PAYMENT_AMOUNT_INVALID",

  // Server errors
  INTERNAL_ERROR: "INTERNAL_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
};

module.exports = ErrorHandler;
