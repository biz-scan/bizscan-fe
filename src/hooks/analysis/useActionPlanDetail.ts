import { getActionPlanDetail } from '@/apis/analysis/analysis';
import { useAppQuery } from '@/apis/apiHooks';
import { analysisKeys } from '@/apis/queryKeys';
import type { GetActionPlanDetailResponse } from '@/types/analysis.type';

export function useActionPlanDetail(actionPlanId?: number) {
  return useAppQuery<GetActionPlanDetailResponse | null>(
    analysisKeys.actionPlanDetail(actionPlanId!),
    () => getActionPlanDetail(actionPlanId!),
    { enabled: !!actionPlanId && !isNaN(actionPlanId) }
  );
}
