import axiosInstance from '@/apis/axiosInstance';
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
  const res = await axiosInstance.post<SignupResponse>('/api/members/register', data);
  return res.data;
}

/* 로그인 */
export async function login(
  data: LoginRequest
): Promise<{ data: LoginResponse; accessToken: string | null }> {
  const res = await axiosInstance.post<LoginResponse>('/api/tokens/login', data);
  const accessToken = res.headers['authorization']?.replace('Bearer ', '') ?? null;

  return { data: res.data, accessToken };
}

/* 로그아웃 */
export async function logout(): Promise<LogoutResponse> {
  const res = await axiosInstance.post<LogoutResponse>('/api/tokens/logout');
  return res.data;
}

/* 리프레쉬 */
export async function refreshToken(): Promise<RefreshTokenResponse> {
  const res = await axiosInstance.post<RefreshTokenResponse>('/api/tokens/reissue');
  return res.data;
}

/* 내 정보 수정 -- 비밀번호 수정은 안되나보네요 */
export async function updateMe(memberId: number, data: UpdateMeRequest): Promise<UpdateMeResponse> {
  const res = await axiosInstance.patch<UpdateMeResponse>(`/api/members/${memberId}`, data);
  return res.data;
}

/* 내 정보 조회 */
export async function getMe(): Promise<GetMeResponse> {
  const res = await axiosInstance.get<GetMeResponse>('/api/members/me');
  return res.data;
}
