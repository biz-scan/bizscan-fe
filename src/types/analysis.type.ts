import type { CommonResponse } from './api.type';

type Status = 'WAITING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
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
