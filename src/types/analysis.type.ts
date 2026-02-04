import type { CommonResponse } from './api.type';

export type ApiResponse<T> = CommonResponse<T>;

// AI 분석 요청 결과
export interface AnalysisRequestResponse {
  requestId: string;
}

// 분석 상태 조회
export type AnalysisStatus = 'WAITING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REQUEST';

export interface AnalysisStatusResponse {
  status: AnalysisStatus;
  progressMessage: string;
  pollingTime: number;
}

// SWOT 데이터
export interface SwotItem {
  swotId: number;
  type: 'S' | 'W' | 'O' | 'T';
  keyword: string;
  description: string;
}

// SWOT 정밀 진단
export interface SwotDiagnosisResponse {
  diagnosis: string;
}

// AI 캐치프레이즈
export interface CatchphraseResponse {
  catchphrase: string | null;
}

// 실행 전략 요약
export interface ActionPlanTag {
  tagId: number;
  tagType: string;
  content: string;
}

export interface ActionPlanItem {
  actionPlanId: number;
  title: string;
  tags: ActionPlanTag[];
}

// 실행 전략 상세
export interface ActionDetail {
  actionDetailId: number;
  step: number;
  title: string;
  description: string;
  expectedOutcome: string;
  isCompleted: boolean;
}

export interface ActionPlanDetailResponse {
  actionPlanId: number;
  actionPlanTitle: string;
  tags: ActionPlanTag[];
  reason: string;
  actionDetails: ActionDetail[];
}
