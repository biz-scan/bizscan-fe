import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postAnalysis } from '@/apis/analysis/analysis'; // analyzeStore 대신 이걸 사용
import { useAppMutation } from '@/apis/apiHooks';
import { storeKeys } from '@/apis/queryKeys';
import { registerStore } from '@/apis/store/store';
import useAuthStore from '@/store/useAuthStore';
import type { RegisterStoreRequest, RegisterStoreResponse } from '@/types/store.type';

export function usePostStore() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setStoreId } = useAuthStore();

  return useAppMutation<RegisterStoreResponse & { requestId: string }, RegisterStoreRequest>(
    async (data: RegisterStoreRequest) => {
      const storeRes = await registerStore(data);

      if (!storeRes.isSuccess) {
        return { ...storeRes, requestId: '' };
      }

      const analyzeRes = await postAnalysis(storeRes.result.storeId);

      setStoreId(storeRes.result.storeId);

      return { ...storeRes, requestId: analyzeRes.result.requestId };
    },
    {
      onSuccess: (res) => {
        if (res.isSuccess && res.requestId) {
          setStoreId(res.result.storeId);
          toast.success('매장이 성공적으로 등록되었습니다.');
          queryClient.invalidateQueries({ queryKey: storeKeys.all });
          navigate(`/analyze/${res.requestId}`, { replace: true });
        }
      },
    }
  );
}
