import { AxiosError } from 'axios';

export type ErrorType = 'network' | 'auth' | 'server' | 'notFound' | 'unknown';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  type: ErrorType;
  originalError: unknown;
}

const getErrorType = (status?: number, code?: string): ErrorType => {
  if (
    code === 'NETWORK_ERROR' ||
    code === 'ERR_NETWORK' ||
    code === 'ECONNABORTED' ||
    code === 'ETIMEDOUT'
  ) {
    return 'network';
  }

  if (status === 401 || status === 403) {
    return 'auth';
  }

  if (status === 404) {
    return 'notFound';
  }

  if (status && status >= 500) {
    return 'server';
  }

  return 'unknown';
};

export const parseAxiosError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const code = error.code;
    const type = getErrorType(status, code);

    return {
      message: error.response?.data?.message || error.message || '알 수 없는 오류가 발생했습니다.',
      status,
      code,
      type,
      originalError: error,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      type: 'unknown',
      originalError: error,
    };
  }

  return {
    message: '알 수 없는 오류가 발생했습니다.',
    type: 'unknown',
    originalError: error,
  };
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  TIMEOUT_ERROR: '요청 시간이 초과되었습니다.',
  UNAUTHORIZED: '로그인이 필요합니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  DEFAULT: '알 수 없는 오류가 발생했습니다.',
} as const;

export const getDefaultErrorMessage = (status?: number): string => {
  switch (status) {
    case 401:
      return ERROR_MESSAGES.UNAUTHORIZED;
    case 403:
      return ERROR_MESSAGES.FORBIDDEN;
    case 404:
      return ERROR_MESSAGES.NOT_FOUND;
    case 500:
    case 502:
    case 503:
    case 504:
      return ERROR_MESSAGES.SERVER_ERROR;
    default:
      return ERROR_MESSAGES.DEFAULT;
  }
};

export const getNetworkErrorMessage = (code?: string): string | null => {
  switch (code) {
    case 'NETWORK_ERROR':
    case 'ERR_NETWORK':
      return ERROR_MESSAGES.NETWORK_ERROR;
    case 'ECONNABORTED':
    case 'ETIMEDOUT':
      return ERROR_MESSAGES.TIMEOUT_ERROR;
    default:
      return null;
  }
};

export const createUserFriendlyMessage = (apiError: ApiError, context?: string): string => {
  const networkMessage = getNetworkErrorMessage(apiError.code);
  if (networkMessage) {
    return networkMessage;
  }

  if (apiError.message && apiError.message !== 'Request failed with status code') {
    return apiError.message;
  }

  if (context) {
    return context;
  }

  return getDefaultErrorMessage(apiError.status);
};

export const getErrorTypeFromError = (error: unknown): ErrorType => {
  const apiError = parseAxiosError(error);
  return apiError.type;
};
