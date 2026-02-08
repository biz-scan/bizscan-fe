import type { CommonResponse } from './api.type';

export type Status =
  | 'REQUEST'
  | 'SWOT_PROCESSING'
  | 'ACTION_PLAN_PROCESSING'
  | 'ACTION_DETAIL_PROCESSING'
  | 'COMPLETED'
  | 'FAILED';
/* REQUEST */
export type AnalyzeStoreRequest = {
  storeId: string;
};

/* RESPONSE */
export type AnalyzeStoreResponse = CommonResponse<{
  requestId: string;
}>;

export type GetAnalysisStatusResponse = CommonResponse<{
  status: Status;
  progressMessage: string;
  pollingTime: number;
}>;
