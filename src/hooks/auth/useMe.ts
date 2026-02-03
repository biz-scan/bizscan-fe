import { type QueryOptions, useAppQuery } from '@/apis/apiHooks';
import { getMe } from '@/apis/auth/auth';
import { tokenStorage } from '@/lib/tokenStorage';
import type { GetMeResponse } from '@/types/auth.type';

export function useMe(options?: QueryOptions<GetMeResponse>) {
  const token = tokenStorage.get();

  return useAppQuery(['auth', 'me'], getMe, {
    enabled: !!token,
    retry: false,
    ...options,
  });
}
