/**
 * Extracts a meaningful error message from an Axios error response.
 *
 * Priority order:
 *  1. Backend JSON body: error.response.data.message
 *  2. HTTP status text fallback
 *  3. Network / timeout errors
 *  4. Generic fallback
 *
 * @param {Error} error - The error thrown by axios
 * @returns {string} Human-readable error message
 */
export function extractErrorMessage(error) {
  if (error.response) {
    // Server responded with a non-2xx status
    const { data, status } = error.response;

    // Use the backend's structured message if available
    if (data && data.message) {
      return data.message;
    }

    // Fallback to HTTP status descriptions
    const statusMessages = {
      400: "Bad request. Please check your input.",
      401: "You are not authenticated. Please log in.",
      403: "You do not have permission to perform this action.",
      404: "The requested resource was not found.",
      409: "A conflict occurred. The resource may already exist.",
      422: "Validation failed. Please check your input.",
      429: "Too many requests. Please try again later.",
      500: "An internal server error occurred. Please try again.",
      502: "Service temporarily unavailable. Please try again.",
      503: "Service is currently unavailable. Please try again later.",
    };

    return statusMessages[status] || `Request failed with status ${status}.`;
  }

  if (error.request) {
    // Request was made but no response received (network error / timeout)
    return "Network error. Please check your internet connection and try again.";
  }

  // Something else went wrong (e.g., request setup error)
  return error.message || "An unexpected error occurred. Please try again.";
}

/**
 * Extracts the backend errorCode from an Axios error response.
 *
 * @param {Error} error - The error thrown by axios
 * @returns {string|null} The errorCode string or null
 */
export function extractErrorCode(error) {
  if (error.response && error.response.data && error.response.data.errorCode) {
    return error.response.data.errorCode;
  }
  return null;
}
