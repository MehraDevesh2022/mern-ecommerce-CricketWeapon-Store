const ErrorHandler = require("../utils/errorHandler");

/**
 * Global error handling middleware.
 * Normalizes all errors into a consistent JSON response shape:
 * { success: false, message, errorCode, statusCode, ...(dev: stack) }
 */
module.exports = (err, req, res, next) => {
  // Default values
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  err.errorCode = err.errorCode || ErrorHandler.CODES.INTERNAL_ERROR;

  // ── Mongoose CastError (invalid ObjectId) ──────────────────────────────────
  if (err.name === "CastError") {
    err = new ErrorHandler(
      `Resource not found. Invalid ${err.path}: ${err.value}`,
      400,
      ErrorHandler.CODES.INVALID_ID
    );
  }

  // ── Mongoose duplicate key ─────────────────────────────────────────────────
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {}).join(", ");
    err = new ErrorHandler(
      `Duplicate value entered for field: ${field}. Please use a different value.`,
      400,
      ErrorHandler.CODES.DUPLICATE_ENTRY
    );
  }

  // ── Mongoose ValidationError ───────────────────────────────────────────────
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors)
      .map((e) => e.message)
      .join(". ");
    err = new ErrorHandler(messages, 400, ErrorHandler.CODES.VALIDATION_ERROR);
  }

  // ── JWT invalid signature ──────────────────────────────────────────────────
  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandler(
      "Invalid authentication token. Please log in again.",
      401,
      ErrorHandler.CODES.TOKEN_INVALID
    );
  }

  // ── JWT expired ────────────────────────────────────────────────────────────
  if (err.name === "TokenExpiredError") {
    err = new ErrorHandler(
      "Your session has expired. Please log in again.",
      401,
      ErrorHandler.CODES.TOKEN_EXPIRED
    );
  }

  // ── Log error details (server-side only) ───────────────────────────────────
  if (process.env.NODE_ENV !== "test") {
    console.error("=== ERROR ===");
    console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.error(`Status: ${err.statusCode} | Code: ${err.errorCode}`);
    console.error(`Message: ${err.message}`);
    if (process.env.NODE_ENV === "development") {
      console.error("Stack:", err.stack);
    }
    console.error("=============");
  }

  // ── Send structured response ───────────────────────────────────────────────
  const response = {
    success: false,
    message: err.message,
    errorCode: err.errorCode,
    statusCode: err.statusCode,
  };

  // Include stack trace only in development
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(err.statusCode).json(response);
};
