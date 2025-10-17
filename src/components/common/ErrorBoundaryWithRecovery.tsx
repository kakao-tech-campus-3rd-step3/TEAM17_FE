import React, { Component } from 'react';
import type { ReactNode } from 'react';
import ErrorUI from './ErrorUI';
import { getErrorTypeFromError } from '@/utils/errorHandling';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  onRetry?: () => void;
  onGoHome?: () => void;
  onLogin?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  retryCount: number;
}

class ErrorBoundaryWithRecovery extends Component<Props, State> {
  private maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, retryCount: 0 };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundaryWithRecovery caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    if (this.state.retryCount < this.maxRetries) {
      this.setState((prevState) => ({
        hasError: false,
        error: null,
        retryCount: prevState.retryCount + 1,
      }));
      this.props.onRetry?.();
    } else {
      window.location.reload();
    }
  };

  handleGoHome = () => {
    this.props.onGoHome?.() || (window.location.href = '/');
  };

  handleLogin = () => {
    this.props.onLogin?.() || (window.location.href = '/login');
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const errorType = getErrorTypeFromError(this.state.error);
      const retryMessage =
        this.state.retryCount > 0 ? ` (${this.state.retryCount}/${this.maxRetries}번 시도)` : '';

      return (
        <ErrorUI
          type={errorType}
          message={this.state.error.message + retryMessage}
          onRetry={this.handleRetry}
          onGoHome={this.handleGoHome}
          onLogin={errorType === 'auth' ? this.handleLogin : undefined}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryWithRecovery;
