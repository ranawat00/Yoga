import React from 'react';
import './ErrorBoundary.css';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isChunkError =
        this.state.error?.name === 'ChunkLoadError' ||
        this.state.error?.message?.includes('Loading chunk');

      return (
        <div className="yho-error-boundary-container">
          <div className="yho-error-boundary-card">
            <div className="yho-error-icon">⚠️</div>
            <h3 className="yho-error-title">
              {isChunkError ? 'Application Update Available' : 'Something went wrong'}
            </h3>
            <p className="yho-error-desc">
              {isChunkError
                ? 'A new version of this section has been updated. Please refresh your page to continue seamlessly.'
                : 'An unexpected error occurred while loading this section.'}
            </p>
            <div className="yho-error-actions">
              <button
                type="button"
                className="yho-error-btn primary"
                onClick={this.handleReload}
              >
                Refresh Page
              </button>
              {!isChunkError && (
                <button
                  type="button"
                  className="yho-error-btn secondary"
                  onClick={this.handleReset}
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
