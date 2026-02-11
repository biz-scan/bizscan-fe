import { getSwots } from '@/apis/analysis/analysis';
import { useAppQuery } from '@/apis/apiHooks';
import { analysisKeys } from '@/apis/queryKeys';
import type { GetSwotsResponse } from '@/types/analysis.type';

export function useSwots(storeId?: number) {
  return useAppQuery<GetSwotsResponse | null>(
    analysisKeys.swots(storeId),
    () => getSwots(storeId!),
    { enabled: !!storeId }
  );
}
