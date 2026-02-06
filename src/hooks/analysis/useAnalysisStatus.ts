import { getAnalysisStatus } from '@/apis/analysis/analysis';
import { useAppQuery } from '@/apis/apiHooks';
import { analysisKeys } from '@/apis/queryKeys';
import type { GetAnalysisStatusResponse } from '@/types/analysis.type';

export function useAnalysisStatus(requestId: string) {
  return useAppQuery<GetAnalysisStatusResponse>(
    analysisKeys.status(requestId),
    () => getAnalysisStatus(requestId),
    {
      enabled: !!requestId,
    }
  );
}
