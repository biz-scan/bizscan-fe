import { toast } from 'sonner';

import { postAnalysis as analyzeStore } from '@/apis/analysis/analysis';
import { useAppMutation } from '@/apis/apiHooks';
import type { PostAnalysisResponse as AnalyzeStoreResponse } from '@/types/analysis.type';

export function useAnalyze() {
  return useAppMutation<AnalyzeStoreResponse, number>((storeId) => analyzeStore(storeId), {
    onSuccess: (res) => {
      if (res.isSuccess) toast.success('매장 분석 요청이 성공적으로 접수되었습니다.');
    },
    onError: () => {
      toast.error('매장 분석 요청에 실패했습니다. 다시 시도해주세요.');
    },
  });
}
