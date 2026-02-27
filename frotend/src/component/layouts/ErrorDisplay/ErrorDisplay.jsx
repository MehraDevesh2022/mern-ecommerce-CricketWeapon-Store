import React from "react";
import { useHistory } from "react-router-dom";
import "./ErrorDisplay.css";

/**
 * Reusable inline error display component.
 *
 * Props:
 *  - message  {string}   Error message to display (required)
 *  - title    {string}   Optional heading (defaults to "Oops! Something went wrong")
 *  - onRetry  {function} Optional retry callback — shows a "Try Again" button
 *  - showHome {boolean}  Whether to show a "Go to Home" button (default: true)
 *  - compact  {boolean}  Renders a smaller inline variant (default: false)
 *
 * Usage:
 *   <ErrorDisplay message={error} onRetry={() => dispatch(fetchData())} />
 */
function ErrorDisplay({
  message,
  title = "Oops! Something went wrong",
  onRetry,
  showHome = true,
  compact = false,
}) {
  const history = useHistory();

  if (!message) return null;

  if (compact) {
    return (
      <div className="error-display error-display--compact" role="alert">
        <span className="error-display__compact-icon" aria-hidden="true">
          ⚠️
        </span>
        <span className="error-display__compact-text">{message}</span>
        {onRetry && (
          <button
            className="error-display__compact-retry"
            onClick={onRetry}
            type="button"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="error-display" role="alert">
      <div className="error-display__container">
        <div className="error-display__icon" aria-hidden="true">
          😕
        </div>
        <h2 className="error-display__title">{title}</h2>
        <p className="error-display__message">{message}</p>
        <div className="error-display__actions">
          {onRetry && (
            <button
              className="error-display__btn error-display__btn--primary"
              onClick={onRetry}
              type="button"
            >
              Try Again
            </button>
          )}
          {showHome && (
            <button
              className="error-display__btn error-display__btn--secondary"
              onClick={() => history.push("/")}
              type="button"
            >
              Go to Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorDisplay;
