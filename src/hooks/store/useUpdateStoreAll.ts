import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { postAnalysis } from '@/apis/analysis/analysis';
import { useAppMutation } from '@/apis/apiHooks';
import { queryClient } from '@/apis/queryClient';
import { storeKeys } from '@/apis/queryKeys';
import { updateStore, updateStoreTags } from '@/apis/store/store';
import useAuthStore from '@/store/useAuthStore';
import type { UpdateStoreRequest } from '@/types/store.type';

type Variables = {
  storeId: number;
  data: UpdateStoreRequest;
  tags: string[];
};

export function useUpdateStoreAll() {
  const navigate = useNavigate();
  const { setStoreId } = useAuthStore();

  return useAppMutation<{ isSuccess: boolean; requestId: string }, Variables>(
    async ({ storeId, data, tags }: Variables) => {
      const baseRes = await updateStore(storeId, data);
      if (!baseRes.isSuccess) return { ...baseRes, requestId: '' };

      const tagsRes = await updateStoreTags(storeId, { tags });

      if (!tagsRes.isSuccess) {
        toast.warning('매장 기본정보는 저장되었지만 태그 저장에 실패했습니다.');
        queryClient.invalidateQueries({ queryKey: storeKeys.all });
        return { ...tagsRes, requestId: '' };
      }

      const analyzeRes = await postAnalysis({ storeId, retry: true });

      setStoreId(storeId);

      return { ...tagsRes, requestId: analyzeRes.result.requestId };
    },
    {
      onSuccess: (res) => {
        if (!res?.isSuccess) return;

        toast.success('매장 정보가 수정되었습니다.');
        queryClient.invalidateQueries({ queryKey: storeKeys.me() });

        if (res.requestId) {
          navigate(`/analyze/${res.requestId}`, { replace: true });
        }
      },
    }
  );
}
