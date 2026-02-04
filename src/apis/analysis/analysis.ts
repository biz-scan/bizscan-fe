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

export const analysisApi = {
  // 매장 AI 분석 요청
  postAnalysis: async (storeId: number) => {
    const response = await axiosInstance.post<ApiResponse<AnalysisRequestResponse>>(
      '/api/analysis',
      {
        storeId,
      }
    );
    return response.data;
  },

  // AI 분석 상태 조회
  getAnalysisStatus: async (requestId: string) => {
    const response = await axiosInstance.get<ApiResponse<AnalysisStatusResponse>>(
      `/api/analysis/${requestId}/status`
    );
    return response.data;
  },

  // SWOT 대시보드 요약 조회
  getSwots: async () => {
    const response = await axiosInstance.get<ApiResponse<SwotItem[]>>('/api/analysis/swots');
    return response.data;
  },

  // SWOT 항목별 정밀 진단 조회
  getSwotDiagnosis: async (swotId: number) => {
    const response = await axiosInstance.get<ApiResponse<SwotDiagnosisResponse>>(
      `/api/analysis/swots/${swotId}/diagnosis`
    );
    return response.data;
  },

  // AI 캐치프레이즈 조회
  getCatchphrase: async () => {
    const response = await axiosInstance.get<ApiResponse<CatchphraseResponse>>(
      '/api/analysis/catchphrase'
    );
    return response.data;
  },

  // 실행 전략 목록 조회
  getActionPlans: async () => {
    const response = await axiosInstance.get<ApiResponse<ActionPlanItem[]>>(
      '/api/analysis/action-plans'
    );
    return response.data;
  },

  // 실행 전략 상세 및 단계별 지침 조회
  getActionPlanDetail: async (actionPlanId: number) => {
    const response = await axiosInstance.get<ApiResponse<ActionPlanDetailResponse>>(
      `/api/analysis/action-plans/${actionPlanId}`
    );
    return response.data;
  },
};
