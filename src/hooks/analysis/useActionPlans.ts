import { getActionPlans } from '@/apis/analysis/analysis';
import { useAppQuery } from '@/apis/apiHooks';
import { analysisKeys } from '@/apis/queryKeys';
import type { GetActionPlansResponse } from '@/types/analysis.type';

export function useActionPlans(storeId?: number, swotType?: string) {
  return useAppQuery<GetActionPlansResponse | null>(
    analysisKeys.actionPlans(storeId, swotType),
    () => getActionPlans(storeId!, swotType),
    { enabled: !!storeId }
  );
}
