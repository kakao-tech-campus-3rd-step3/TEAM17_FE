import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions, QueryKey, UseQueryResult } from '@tanstack/react-query';

export const useSuspenseQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: (context: { queryKey: TQueryKey }) => Promise<TQueryFnData>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'throwOnError'>
): UseQueryResult<TData, TError> => {
  const result = useQuery({
    queryKey,
    queryFn,
    ...options,
    throwOnError: true,
  });

  if (result.isLoading) {
    throw new Promise(() => {});
  }

  if (result.error) {
    throw result.error;
  }

  return result as UseQueryResult<TData, TError>;
};
