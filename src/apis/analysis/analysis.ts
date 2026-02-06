import type {
  AnalyzeStoreRequest,
  AnalyzeStoreResponse,
  GetAnalysisStatusResponse,
} from '@/types/analysis.type';

import axiosInstance from '../axiosInstance';

/* 매장 분석 요청 */
export async function analyzeStore(data: AnalyzeStoreRequest): Promise<AnalyzeStoreResponse> {
  const res = await axiosInstance.post<AnalyzeStoreResponse>('/api/analysis/store', data);
  return res.data;
}

/* 매장 분석 요청 */
export async function getAnalysisStatus(requestId: string): Promise<GetAnalysisStatusResponse> {
  const res = await axiosInstance.get<GetAnalysisStatusResponse>(
    `/api/analysis/${requestId}/status`
  );
  return res.data;
}
