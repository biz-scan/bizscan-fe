import {
  type MutationFunction,
  type QueryFunction,
  type QueryKey,
  useMutation,
  type UseMutationOptions,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

const DEFAULT_STALE_TIME = 1000 * 60 * 5;

export interface ApiError {
  message: string;
}

export type QueryOptions<TData, TResult = TData> = Omit<
  UseQueryOptions<TData, AxiosError<ApiError>, TResult, QueryKey>,
  'queryKey' | 'queryFn'
>;

export type MutationOptions<TData = unknown, TVariables = void> = Omit<
  UseMutationOptions<TData, AxiosError<ApiError>, TVariables>,
  'mutationFn'
>;

export function useAppQuery<TData, TResult = TData>(
  queryKey: QueryKey,
  queryFn: QueryFunction<TData, QueryKey>,
  options?: QueryOptions<TData, TResult>
) {
  return useQuery<TData, AxiosError<ApiError>, TResult, QueryKey>({
    queryKey,
    queryFn,
    staleTime: DEFAULT_STALE_TIME,
    ...options,
  });
}

export function useAppMutation<TData, TVariables>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: MutationOptions<TData, TVariables>
) {
  return useMutation<TData, AxiosError<ApiError>, TVariables>({
    mutationFn,
    onError: (error) => {
      const message = error.response?.data?.message || '오류가 발생했습니다.';
      toast.error(message);
    },
    ...options,
  });
}
