import type { CommonResponse } from './api.type';

export type User = {
  id: number;
  email: string;
  nickname: string;
  storeId: number | null;
  requestId: string | null;
  status:
    | 'REQUEST'
    | 'SWOT_PROCESSING'
    | 'ACTION_PLAN_PROCESSING'
    | 'ACTION_DETAIL_PROCESSING'
    | 'COMPLETED'
    | 'FAILED'
    | null;
};

/* REQUEST */
export type SignupRequest = {
  email: string;
  nickname: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type UpdateMeRequest = {
  nickname?: string;
  currentPassword?: string | null;
  newPassword?: string | null;
};

/* RESPONSE */
export type SignupResponse = CommonResponse<User>;

export type LoginResponse = CommonResponse<{
  accessToken: string;
}>;

export type LogoutResponse = CommonResponse<string>;

export type RefreshTokenResponse = CommonResponse<{
  accessToken: string;
}>;

export type GetMeResponse = CommonResponse<User>;

export type UpdateMeResponse = CommonResponse<string>;
