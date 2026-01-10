import type { QueryKey, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

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
