import { useState, useCallback, useRef, useEffect } from 'react';

// 비동기 상태 타입 정의
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface UseAsyncOptions<T> {
  initialData?: T | null;
  immediate?: boolean;
  errorMessage?: (error: unknown) => string;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

export interface UseAsyncReturn<T, Args extends unknown[] = []> extends AsyncState<T> {
  execute: (...args: Args) => Promise<T | null>;
  reset: () => void;
  setData: (data: T | null) => void;
  setError: (error: string | null) => void;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  options?: UseAsyncOptions<T> & { immediate?: boolean }
): UseAsyncReturn<T, []>;

export function useAsync<T, Args extends unknown[]>(
  asyncFunction: (...args: Args) => Promise<T>,
  options?: UseAsyncOptions<T> & { immediate?: boolean }
): UseAsyncReturn<T, Args>;

/**
 * 비동기 함수의 상태를 관리하는 커스텀 훅
 * @param asyncFunction - 실행할 비동기 함수
 * @param options - 옵션 설정
 * @returns 비동기 상태와 제어 함수들
 */
export function useAsync<T, Args extends unknown[] = []>(
  asyncFunction: (...args: Args) => Promise<T>,
  options: UseAsyncOptions<T> & { immediate?: boolean } = {}
): UseAsyncReturn<T, Args> {
  const {
    initialData = null,
    immediate = true,
    errorMessage = (error: unknown) =>
      error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
    onSuccess,
    onError,
  } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 요청 취소 및 순서 관리를 위한 ref
  const abortControllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  // 비동기 함수 실행
  const execute = useCallback(
    async (...args: Args): Promise<T | null> => {
      // 이전 요청 취소
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // 새로운 AbortController 생성
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      // 요청 ID 증가 (race condition 방지)
      const currentRequestId = ++requestIdRef.current;

      try {
        setLoading(true);
        setError(null);

        // asyncFunction이 AbortSignal을 지원하는지 확인
        const result = await asyncFunction(...args);

        // 요청이 취소되었거나 더 최신 요청이 있으면 무시
        if (abortController.signal.aborted || currentRequestId !== requestIdRef.current) {
          return null;
        }

        setData(result);
        onSuccess?.(result);
        return result;
      } catch (err) {
        // 요청이 취소되었거나 더 최신 요청이 있으면 무시
        if (abortController.signal.aborted || currentRequestId !== requestIdRef.current) {
          return null;
        }

        const errorMsg = errorMessage(err);
        setError(errorMsg);
        onError?.(errorMsg);
        return null;
      } finally {
        // 현재 요청이 최신 요청인 경우에만 로딩 상태 해제
        if (currentRequestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    },
    [asyncFunction, errorMessage, onSuccess, onError]
  );

  // 상태 리셋
  const reset = useCallback(() => {
    // 진행 중인 요청 취소
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setData(initialData);
    setLoading(false);
    setError(null);
  }, [initialData]);

  // 컴포넌트 언마운트 시 취소
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // immediate가 true면 자동 실행
  useEffect(() => {
    if (immediate) {
      // immediate 실행 시에는 인자 없이 호출
      // 타입 레벨에서 인자 없는 함수인지 확인
      void execute(...([] as unknown as Args));
    }
  }, [immediate, execute]);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    setData,
    setError,
  };
}

// CRUD 액션을 위한 useAsyncActions 훅
export interface UseAsyncActionsOptions {
  // 에러 메시지 변환 함수
  errorMessage?: (error: unknown) => string;
  // 성공 시 콜백
  onSuccess?: (action: string, data?: unknown) => void;
  // 실패 시 콜백
  onError?: (action: string, error: string) => void;
}

export interface UseAsyncActionsReturn {
  // 로딩 상태
  loading: boolean;
  // 에러 상태
  error: string | null;
  // 액션 실행 함수
  execute: <T>(action: () => Promise<T>) => Promise<T | null>;
  // 에러 리셋
  clearError: () => void;
}

/**
 * CRUD 액션을 위한 비동기 상태 관리 훅
 * @param options - 옵션 설정
 * @returns 액션 상태와 실행 함수
 */
export function useAsyncActions(options: UseAsyncActionsOptions = {}): UseAsyncActionsReturn {
  const {
    errorMessage = (error: unknown) =>
      error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
    onSuccess,
    onError,
  } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async <T>(action: () => Promise<T>): Promise<T | null> => {
      try {
        setLoading(true);
        setError(null);

        const result = await action();
        onSuccess?.('execute', result);
        return result;
      } catch (err) {
        const errorMsg = errorMessage(err);
        setError(errorMsg);
        onError?.('execute', errorMsg);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [errorMessage, onSuccess, onError]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    execute,
    clearError,
  };
}
