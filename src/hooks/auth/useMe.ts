import { useAppQuery } from '@/apis/apiHooks';
import { getMe } from '@/apis/auth/auth';
import { authKeys } from '@/apis/queryKeys';
import { tokenStorage } from '@/lib/tokenStorage';

export function useMe() {
  const token = tokenStorage.get();

  return useAppQuery(authKeys.me(), getMe, {
    enabled: !!token,
    retry: false,
  });
}
