import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useAppMutation } from '@/apis/apiHooks';
import { storeKeys } from '@/apis/queryKeys';
import { updateStore, updateStoreTags } from '@/apis/store/store';
import type { UpdateStoreRequest } from '@/types/store.type';

type Variables = {
  storeId: number;
  data: UpdateStoreRequest;
  tags: string[];
};

export function useUpdateStoreAll() {
  const queryClient = useQueryClient();

  const invalidate = (storeId: number) => {
    queryClient.invalidateQueries({ queryKey: storeKeys.my(storeId) });
    queryClient.invalidateQueries({ queryKey: storeKeys.all });
  };

  return useAppMutation(
    async ({ storeId, data, tags }: Variables) => {
      const baseRes = await updateStore(storeId, data);
      if (!baseRes.isSuccess) return baseRes;

      const tagsRes = await updateStoreTags(storeId, { tags });

      if (!tagsRes.isSuccess) {
        toast.warning('매장 기본정보는 저장되었지만 태그 저장에 실패했습니다.');
        invalidate(storeId);
        return tagsRes;
      }

      return tagsRes;
    },
    {
      onSuccess: (res, variables) => {
        if (!res?.isSuccess) return;

        toast.success('매장 정보가 수정되었습니다.');
        invalidate(variables.storeId);
      },
    }
  );
}
