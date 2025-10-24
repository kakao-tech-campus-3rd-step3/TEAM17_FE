import React, { Component } from 'react';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

const FallbackContainer = styled.div`
  padding: 2rem;
  text-align: center;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  margin: 1rem;
`;

const FallbackTitle = styled.h2`
  color: ${tokens.colors.text.warning};
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

const FallbackMessage = styled.p`
  color: #7f1d1d;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const FallbackButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${tokens.colors.orange.primary};
  color: ${tokens.colors.text.white};
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    background-color: ${tokens.colors.orange.hover};
  }
`;

const DefaultErrorFallback = ({ error }: { error?: Error }) => (
  <FallbackContainer>
    <FallbackTitle>오류가 발생했습니다</FallbackTitle>
    <FallbackMessage>{error?.message || '알 수 없는 오류가 발생했습니다.'}</FallbackMessage>
    <FallbackButton onClick={() => window.location.reload()}>새로고침</FallbackButton>
  </FallbackContainer>
);

export default ErrorBoundary;
