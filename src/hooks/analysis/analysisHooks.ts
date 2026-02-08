import { useAppMutation, useAppQuery } from '@/apis/apiHooks';
import {
  postAnalysis,
  getAnalysisStatus,
  getSwots,
  getSwotDiagnosis,
  getCatchphrase,
  getActionPlans,
  getActionPlanDetail,
} from '@/apis/analysis/analysis';
import { analysisKeys } from '@/apis/queryKeys';

import type {
  ApiResponse,
  AnalysisRequestResponse,
  AnalysisStatusResponse,
  SwotItem,
  SwotDiagnosisResponse,
  CatchphraseResponse,
  ActionPlanItem,
  ActionPlanDetailResponse,
} from '@/types/analysis.type';

// POST /api/analysis
export const usePostAnalysis = () => {
  return useAppMutation<ApiResponse<AnalysisRequestResponse>, number>((storeId) =>
    postAnalysis(storeId)
  );
};

// GET /api/analysis/{requestId}/status
export const useGetAnalysisStatus = (requestId: string) => {
  return useAppQuery<ApiResponse<AnalysisStatusResponse>>(
    analysisKeys.status(requestId),
    () => getAnalysisStatus(requestId),
    {
      enabled: !!requestId,
    }
  );
};

// GET /api/analysis/swots?storeId={storeId}
export const useGetSwots = (storeId?: number) => {
  return useAppQuery<ApiResponse<SwotItem[]> | null>(
    analysisKeys.swots(storeId),
    () => getSwots(storeId!),
    {
      enabled: !!storeId,
    }
  );
};

// GET /api/analysis/swots/{swotId}/diagnosis
export const useGetSwotDiagnosis = (swotId?: number) => {
  return useAppQuery<ApiResponse<SwotDiagnosisResponse> | null>(
    analysisKeys.swotDiagnosis(swotId!),
    () => getSwotDiagnosis(swotId!),
    {
      enabled: !!swotId && !isNaN(swotId),
    }
  );
};

// GET /api/analysis/catchphrase?storeId={storeId}
// storeId가 없으면 요청은 보내지 않음
export const useGetCatchphrase = (storeId?: number) => {
  return useAppQuery<ApiResponse<CatchphraseResponse> | null>(
    analysisKeys.catchphrase(storeId),
    () => getCatchphrase(storeId!),
    {
      enabled: !!storeId,
    }
  );
};

// GET /api/analysis/action-plans?storeId={storeId}
// storeId가 없으면 요청은 보내지 않음
export const useGetActionPlans = (storeId?: number) => {
  return useAppQuery<ApiResponse<ActionPlanItem[]> | null>(
    analysisKeys.actionPlans(storeId),
    () => getActionPlans(storeId!),
    {
      enabled: !!storeId,
    }
  );
};

// GET /api/analysis/action-plans/{actionPlanId}
export const useGetActionPlanDetail = (actionPlanId?: number) => {
  return useAppQuery<ApiResponse<ActionPlanDetailResponse> | null>(
    analysisKeys.actionPlanDetail(actionPlanId!),
    () => getActionPlanDetail(actionPlanId!),
    {
      enabled: !!actionPlanId && !isNaN(actionPlanId),
    }
  );
};
