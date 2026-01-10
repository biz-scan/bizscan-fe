import { getMe } from '@/apis/auth/auth';
import { useAppQuery } from '@/apis/query';

export function useMe() {
  return useAppQuery(['auth', 'me'], getMe, {
    retry: false,
  });
}
