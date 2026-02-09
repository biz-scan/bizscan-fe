import { toast } from 'sonner';

import { useAppMutation } from '@/apis/apiHooks';
import { queryClient } from '@/apis/queryClient';
import { storeKeys } from '@/apis/queryKeys';
import { updateStore } from '@/apis/store/store';
import type { UpdateStoreRequest } from '@/types/store.type';

export function useUpdateStore() {
  return useAppMutation(
    ({ storeId, data }: { storeId: number; data: UpdateStoreRequest }) =>
      updateStore(storeId, data),
    {
      onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success('매장 정보가 수정되었습니다.');
          queryClient.invalidateQueries({ queryKey: storeKeys.all });
        }
      },
    }
  );
}
