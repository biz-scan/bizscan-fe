import api from '@/apis/axiosIntance';
import type {
  GetMeResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RefreshTokenResponse,
  SignupRequest,
  SignupResponse,
  UpdateMeRequest,
  UpdateMeResponse,
} from '@/types/auth.type';

/* 회원가입 */
export async function signup(data: SignupRequest): Promise<SignupResponse> {
  const res = await api.post<SignupResponse>('/api/member/register', data);
  return res.data;
}

/* 로그인 */
export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>('/api/tokens/login', data);
  return res.data;
}

/* 로그아웃 */
export async function logout(): Promise<LogoutResponse> {
  const res = await api.post<LogoutResponse>('/api/tokens/logout');
  return res.data;
}

/* 리프레쉬 */
export async function refreshToken(): Promise<RefreshTokenResponse> {
  const res = await api.post<RefreshTokenResponse>('/api/tokens/reissue');
  return res.data;
}

/* 내 정보 수정 -- 비밀번호 수정은 안되나보네요 */
export async function updateMe(memberId: number, data: UpdateMeRequest): Promise<UpdateMeResponse> {
  const res = await api.patch<UpdateMeResponse>(`/api/member/${memberId}`, data);
  return res.data;
}

/* 내 정보 조회 */
export async function getMe(): Promise<GetMeResponse> {
  const res = await api.get<GetMeResponse>('/api/member/me');
  return res.data;
}
