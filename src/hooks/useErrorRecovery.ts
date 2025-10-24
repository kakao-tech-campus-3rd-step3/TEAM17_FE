import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseErrorRecoveryOptions {
  maxRetries?: number;
  onRetry?: () => void;
  onGoHome?: () => void;
  onLogin?: () => void;
}

export const useErrorRecovery = (options: UseErrorRecoveryOptions = {}) => {
  const navigate = useNavigate();
  const [retryCount, setRetryCount] = useState(0);
  const { maxRetries = 3, onRetry, onGoHome, onLogin } = options;

  const handleRetry = useCallback(() => {
    if (retryCount < maxRetries) {
      setRetryCount((prev) => prev + 1);
      onRetry?.();
    } else {
      window.location.reload();
    }
  }, [retryCount, maxRetries, onRetry]);

  const handleGoHome = useCallback(() => {
    if (onGoHome) {
      onGoHome();
    } else {
      navigate('/');
    }
  }, [navigate, onGoHome]);

  const handleLogin = useCallback(() => {
    if (onLogin) {
      onLogin();
    } else {
      navigate('/login');
    }
  }, [navigate, onLogin]);

  const resetRetryCount = useCallback(() => {
    setRetryCount(0);
  }, []);

  return {
    retryCount,
    maxRetries,
    handleRetry,
    handleGoHome,
    handleLogin,
    resetRetryCount,
    canRetry: retryCount < maxRetries,
  };
};
