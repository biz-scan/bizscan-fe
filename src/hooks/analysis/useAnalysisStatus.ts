import { keepPreviousData } from '@tanstack/react-query';

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
      placeholderData: keepPreviousData,
      refetchInterval: (query) => {
        if (query.state.error) return false;
        const status = query.state.data?.result?.status;
        if (status === 'COMPLETED' || status === 'FAILED') return false;
        return query.state.data?.result?.pollingTime ?? 3000;
      },
    }
  );
}
