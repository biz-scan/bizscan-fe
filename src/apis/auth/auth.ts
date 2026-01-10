import api from '@/apis/axiosIntance';
import type { LoginRequest, LoginResponse, SignupRequest, User } from '@/types/auth.type';

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>('/auth/login', data);
  return res.data;
}

export async function signup(data: SignupRequest): Promise<User> {
  const res = await api.post<User>('/auth/signup', data);
  return res.data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function getMe(): Promise<User> {
  const res = await api.get<User>('/auth/me');
  return res.data;
}
