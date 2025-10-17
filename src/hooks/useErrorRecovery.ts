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
  const { maxRetries = 3 } = options;

  const handleRetry = useCallback(() => {
    if (retryCount < maxRetries) {
      setRetryCount((prev) => prev + 1);
      options.onRetry?.();
    } else {
      window.location.reload();
    }
  }, [retryCount, maxRetries, options]);

  const handleGoHome = useCallback(() => {
    if (options.onGoHome) {
      options.onGoHome();
    } else {
      navigate('/');
    }
  }, [navigate, options]);

  const handleLogin = useCallback(() => {
    if (options.onLogin) {
      options.onLogin();
    } else {
      navigate('/login');
    }
  }, [navigate, options]);

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
