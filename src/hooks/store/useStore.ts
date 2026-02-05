import { useAppQuery } from '@/apis/apiHooks';
import { storeKeys } from '@/apis/queryKeys';
import { getStore } from '@/apis/store/store';

export function useStore(storeId: number) {
  return useAppQuery(storeKeys.my(storeId), () => getStore(storeId));
}
