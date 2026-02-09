import type { CommonResponse } from './api.type';

// 분석 상태 조회 (Develop의 상세 상태값 채택)
export type AnalysisStatus =
  | 'REQUEST'
  | 'SWOT_PROCESSING'
  | 'ACTION_PLAN_PROCESSING'
  | 'ACTION_DETAIL_PROCESSING'
  | 'COMPLETED'
  | 'FAILED';

export interface AnalysisStatusInfo {
  status: AnalysisStatus;
  progressMessage: string;
  pollingTime: number;
}

// 분석 요청 시 반환되는 데이터
export interface AnalysisRequestResult {
  requestId: string;
}

// SWOT 데이터
export interface SwotItem {
  swotId: number;
  type: 'S' | 'W' | 'O' | 'T';
  keyword: string;
  description: string;
}

// SWOT 정밀 진단
export interface SwotDiagnosisResult {
  diagnosis: string;
}

// AI 캐치프레이즈
export interface CatchphraseResult {
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
  relatedSwot?: string;
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

export interface ActionPlanDetailResult {
  actionPlanId: number;
  actionPlanTitle: string;
  tags: ActionPlanTag[];
  reason: string;
  actionDetails: ActionDetail[];
}

export type PostAnalysisResponse = CommonResponse<AnalysisRequestResult>;
export type GetAnalysisStatusResponse = CommonResponse<AnalysisStatusInfo>;
export type GetSwotsResponse = CommonResponse<SwotItem[]>;
export type GetSwotDiagnosisResponse = CommonResponse<SwotDiagnosisResult>;
export type GetCatchphraseResponse = CommonResponse<CatchphraseResult>;
export type GetActionPlansResponse = CommonResponse<ActionPlanItem[]>;
export type GetActionPlanDetailResponse = CommonResponse<ActionPlanDetailResult>;
