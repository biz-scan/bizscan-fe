import { login, logout, signup } from '@/apis/auth/auth';
import { useAppMutation } from '@/apis/query';
import type { LoginRequest, SignupRequest } from '@/types/auth.type';

export function useLogin() {
  return useAppMutation((data: LoginRequest) => login(data));
}

export function useSignup() {
  return useAppMutation((data: SignupRequest) => signup(data));
}

export function useLogout() {
  return useAppMutation(() => logout());
}
