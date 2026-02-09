import {
  getActionPlanDetail,
  getActionPlans,
  getAnalysisStatus,
  getCatchphrase,
  getSwotDiagnosis,
  getSwots,
  postAnalysis,
} from '@/apis/analysis/analysis';
import { useAppMutation, useAppQuery } from '@/apis/apiHooks';
import { analysisKeys } from '@/apis/queryKeys';
import type {
  GetActionPlanDetailResponse,
  GetActionPlansResponse,
  GetAnalysisStatusResponse,
  GetCatchphraseResponse,
  GetSwotDiagnosisResponse,
  GetSwotsResponse,
  PostAnalysisResponse,
} from '@/types/analysis.type';

// POST /api/analysis
export const usePostAnalysis = () => {
  return useAppMutation<PostAnalysisResponse, number>((storeId) => postAnalysis(storeId));
};

// GET /api/analysis/{requestId}/status
export const useGetAnalysisStatus = (requestId: string) => {
  return useAppQuery<GetAnalysisStatusResponse>(
    analysisKeys.status(requestId),
    () => getAnalysisStatus(requestId),
    { enabled: !!requestId }
  );
};

// GET /api/analysis/swots?storeId={storeId}
export const useGetSwots = (storeId?: number) => {
  return useAppQuery<GetSwotsResponse | null>(
    analysisKeys.swots(storeId),
    () => getSwots(storeId!),
    { enabled: !!storeId }
  );
};

// GET /api/analysis/swots/{swotId}/diagnosis
export const useGetSwotDiagnosis = (swotId?: number) => {
  return useAppQuery<GetSwotDiagnosisResponse | null>(
    analysisKeys.swotDiagnosis(swotId!),
    () => getSwotDiagnosis(swotId!),
    { enabled: !!swotId && !isNaN(swotId) }
  );
};

// GET /api/analysis/catchphrase?storeId={storeId}
// storeId가 없으면 요청은 보내지 않음
export const useGetCatchphrase = (storeId?: number) => {
  return useAppQuery<GetCatchphraseResponse | null>(
    analysisKeys.catchphrase(storeId),
    () => getCatchphrase(storeId!),
    { enabled: !!storeId }
  );
};

// GET /api/analysis/action-plans?storeId={storeId}
// storeId가 없으면 요청은 보내지 않음
export const useGetActionPlans = (storeId?: number, swotType?: string) => {
  return useAppQuery<GetActionPlansResponse | null>(
    analysisKeys.actionPlans(storeId, swotType),
    () => getActionPlans(storeId!, swotType),
    { enabled: !!storeId }
  );
};

// GET /api/analysis/action-plans/{actionPlanId}
export const useGetActionPlanDetail = (actionPlanId?: number) => {
  return useAppQuery<GetActionPlanDetailResponse | null>(
    analysisKeys.actionPlanDetail(actionPlanId!),
    () => getActionPlanDetail(actionPlanId!),
    { enabled: !!actionPlanId && !isNaN(actionPlanId) }
  );
};
