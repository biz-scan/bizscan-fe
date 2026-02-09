import { toast } from 'sonner';

import { useAppMutation } from '@/apis/apiHooks';
import { queryClient } from '@/apis/queryClient';
import { storeKeys } from '@/apis/queryKeys';
import { updateStoreTags } from '@/apis/store/store';

export function useUpdateStoreTags() {
  return useAppMutation(
    ({ storeId, tags }: { storeId: number; tags: string[] }) => updateStoreTags(storeId, { tags }),
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
