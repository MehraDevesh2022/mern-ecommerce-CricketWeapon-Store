import React from "react";
import "./ErrorBoundary.css";

/**
 * React Error Boundary — catches unhandled render/lifecycle errors in the
 * component tree and displays a meaningful fallback UI instead of a blank page.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <YourComponent />
 *   </ErrorBoundary>
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // In production you would send this to an error tracking service (e.g. Sentry)
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__container">
            <div className="error-boundary__icon" aria-hidden="true">
              ⚠️
            </div>
            <h1 className="error-boundary__title">Something went wrong</h1>
            <p className="error-boundary__message">
              An unexpected error occurred. Our team has been notified. Please
              try refreshing the page or go back to the home page.
            </p>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="error-boundary__details">
                <summary>Error details (development only)</summary>
                <pre className="error-boundary__stack">
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div className="error-boundary__actions">
              <button
                className="error-boundary__btn error-boundary__btn--primary"
                onClick={this.handleReload}
              >
                Refresh Page
              </button>
              <button
                className="error-boundary__btn error-boundary__btn--secondary"
                onClick={this.handleGoHome}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
