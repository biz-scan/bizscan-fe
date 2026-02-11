import { getSwotDiagnosis } from '@/apis/analysis/analysis';
import { useAppQuery } from '@/apis/apiHooks';
import { analysisKeys } from '@/apis/queryKeys';
import type { GetSwotDiagnosisResponse } from '@/types/analysis.type';

export function useSwotDiagnosis(swotId?: number) {
  return useAppQuery<GetSwotDiagnosisResponse | null>(
    analysisKeys.swotDiagnosis(swotId!),
    () => getSwotDiagnosis(swotId!),
    { enabled: !!swotId && !isNaN(swotId) }
  );
}
