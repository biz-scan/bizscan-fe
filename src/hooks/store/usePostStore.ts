import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { analyzeStore } from '@/apis/analysis/analysis';
import { useAppMutation } from '@/apis/apiHooks';
import { storeKeys } from '@/apis/queryKeys';
import { registerStore } from '@/apis/store/store';
import type { RegisterStoreRequest, RegisterStoreResponse } from '@/types/store.type';

export function usePostStore() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useAppMutation<RegisterStoreResponse & { requestId: string }, RegisterStoreRequest>(
    async (data: RegisterStoreRequest) => {
      const storeRes = await registerStore(data);
      if (!storeRes.isSuccess) {
        return { ...storeRes, requestId: '' };
      }
      const analyzeRes = await analyzeStore({ storeId: String(storeRes.result.storeId) });
      return { ...storeRes, requestId: analyzeRes.result.requestId };
    },
    {
      onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success('매장이 성공적으로 등록되었습니다.');
          queryClient.invalidateQueries({ queryKey: storeKeys.all });
          navigate(`/analyze/${res.requestId}`, { replace: true });
        }
      },
    }
  );
}
