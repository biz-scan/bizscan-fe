import { useAppQuery } from '@/apis/apiHooks';
import { storeKeys } from '@/apis/queryKeys';
import { getStore } from '@/apis/store/store';

export function useStore() {
  return useAppQuery(storeKeys.my(), getStore);
}
