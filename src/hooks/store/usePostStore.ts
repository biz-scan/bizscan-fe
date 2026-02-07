import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useAppMutation } from '@/apis/apiHooks';
import { storeKeys } from '@/apis/queryKeys';
import { registerStore } from '@/apis/store/store';
import type { RegisterStoreRequest } from '@/types/store.type';

export function usePostStore() {
  const queryClient = useQueryClient();

  return useAppMutation((data: RegisterStoreRequest) => registerStore(data), {
    onSuccess: (res) => {
      if (res.isSuccess) {
        toast.success('매장이 성공적으로 등록되었습니다.');
        queryClient.invalidateQueries({ queryKey: storeKeys.all });
      }
    },
  });
}
