import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useAppMutation } from '@/apis/apiHooks';
import { storeKeys } from '@/apis/queryKeys';
import { updateStoreTags } from '@/apis/store/store';

export function useUpdateStoreTags() {
  const queryClient = useQueryClient();

  return useAppMutation(
    ({ storeId, tags }: { storeId: number; tags: string[] }) =>
      updateStoreTags(storeId, { tags }),
    {
      onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success('매장 태그가 수정되었습니다.');
          queryClient.invalidateQueries({ queryKey: storeKeys.all });
        }
      },
    }
  );
}
