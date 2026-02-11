import { getCatchphrase } from '@/apis/analysis/analysis';
import { useAppQuery } from '@/apis/apiHooks';
import { analysisKeys } from '@/apis/queryKeys';
import type { GetCatchphraseResponse } from '@/types/analysis.type';

export function useCatchphrase(storeId?: number) {
  return useAppQuery<GetCatchphraseResponse | null>(
    analysisKeys.catchphrase(storeId),
    () => getCatchphrase(storeId!),
    { enabled: !!storeId }
  );
}
