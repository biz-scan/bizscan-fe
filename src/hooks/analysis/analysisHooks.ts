import { useMutation, useQuery } from '@tanstack/react-query';

import { analysisApi } from '@/apis/analysis/analysis';
import { analysisKeys } from '@/apis/queryKeys';

// POST /api/analysis
export const usePostAnalysis = () => {
  return useMutation({
    mutationFn: (storeId: number) => analysisApi.postAnalysis(storeId),
  });
};

// GET /api/analysis/{requestId}/status
export const useGetAnalysisStatus = (requestId: string) => {
  return useQuery({
    queryKey: analysisKeys.status(requestId),
    queryFn: () => analysisApi.getAnalysisStatus(requestId),
    enabled: !!requestId,
  });
};

// GET /api/analysis/swots?storeId={storeId}
export const useGetSwots = (storeId?: number) => {
  return useQuery({
    queryKey: analysisKeys.swots(storeId),
    queryFn: () => analysisApi.getSwots(storeId!),
    enabled: !!storeId,
  });
};

// GET /api/analysis/swots/{swotId}/diagnosis
export const useGetSwotDiagnosis = (swotId?: number) => {
  return useQuery({
    queryKey: analysisKeys.swotDiagnosis(swotId!),
    queryFn: () => analysisApi.getSwotDiagnosis(swotId!),
    enabled: !!swotId && !isNaN(swotId),
  });
};

// GET /api/analysis/catchphrase?storeId={storeId}
// storeId가 없으면 요청은 보내지 않음
export const useGetCatchphrase = (storeId?: number) => {
  return useQuery({
    queryKey: analysisKeys.catchphrase(storeId),
    queryFn: () => analysisApi.getCatchphrase(storeId!),
    enabled: !!storeId,
  });
};

// GET /api/analysis/action-plans?storeId={storeId}
// storeId가 없으면 요청은 보내지 않음
export const useGetActionPlans = (storeId?: number) => {
  return useQuery({
    queryKey: analysisKeys.actionPlans(storeId),
    queryFn: () => analysisApi.getActionPlans(storeId!),
    enabled: !!storeId,
  });
};

// GET /api/analysis/action-plans/{actionPlanId}
export const useGetActionPlanDetail = (actionPlanId?: number) => {
  return useQuery({
    queryKey: analysisKeys.actionPlanDetail(actionPlanId!),
    queryFn: () => analysisApi.getActionPlanDetail(actionPlanId!),
    enabled: !!actionPlanId && !isNaN(actionPlanId),
  });
};
