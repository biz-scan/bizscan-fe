import { useAppQuery } from '@/apis/apiHooks';
import { getMe } from '@/apis/auth/auth';
import { tokenStorage } from '@/lib/tokenStorage';

export function useMe() {
  const token = tokenStorage.get();

  return useAppQuery(['auth', 'me'], getMe, {
    enabled: !!token,
    retry: false,
  });
}
