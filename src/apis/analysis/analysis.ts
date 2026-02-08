import axiosInstance from '@/apis/axiosInstance';
import {
  ApiResponse,
  AnalysisRequestResponse,
  AnalysisStatusResponse,
  SwotItem,
  SwotDiagnosisResponse,
  CatchphraseResponse,
  ActionPlanItem,
  ActionPlanDetailResponse,
} from '@/types/analysis.type';

// 매장 AI 분석 요청
export const postAnalysis = async (storeId: number) => {
  const response = await axiosInstance.post<ApiResponse<AnalysisRequestResponse>>('/api/analysis', {
    storeId,
  });
  return response.data;
};

// AI 분석 상태 조회
export const getAnalysisStatus = async (requestId: string) => {
  const response = await axiosInstance.get<ApiResponse<AnalysisStatusResponse>>(
    `/api/analysis/${requestId}/status`
  );
  return response.data;
};

// SWOT 대시보드 요약 조회
export const getSwots = async (storeId: number) => {
  if (!storeId) return null;
  const response = await axiosInstance.get<ApiResponse<SwotItem[]>>('/api/analysis/swots', {
    params: { storeId },
  });
  return response.data;
};

// SWOT 항목별 정밀 진단 조회
export const getSwotDiagnosis = async (swotId: number) => {
  if (!swotId) return null;
  const response = await axiosInstance.get<ApiResponse<SwotDiagnosisResponse>>(
    `/api/analysis/swots/${swotId}/diagnosis`
  );
  return response.data;
};

// AI 캐치프레이즈 조회
export const getCatchphrase = async (storeId: number) => {
  if (!storeId) return null;
  const response = await axiosInstance.get<ApiResponse<CatchphraseResponse>>(
    '/api/analysis/catchphrase',
    {
      params: { storeId },
    }
  );
  return response.data;
};

// 실행 전략 목록 조회
export const getActionPlans = async (storeId: number) => {
  if (!storeId) return null;
  const response = await axiosInstance.get<ApiResponse<ActionPlanItem[]>>(
    '/api/analysis/action-plans',
    {
      params: { storeId },
    }
  );
  return response.data;
};

// 실행 전략 상세 및 단계별 지침 조회
export const getActionPlanDetail = async (actionPlanId: number) => {
  if (!actionPlanId) return null;
  const response = await axiosInstance.get<ApiResponse<ActionPlanDetailResponse>>(
    `/api/analysis/action-plans/${actionPlanId}`
  );
  return response.data;
};
