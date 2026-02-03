import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAppMutation } from '@/apis/apiHooks';
import { getMe, login } from '@/apis/auth/auth';
import useAuthStore from '@/store/useAuthStore';
import type { LoginRequest, LoginResponse } from '@/types/auth.type';

interface UseLoginOptions {
  rememberMe?: boolean;
}

export function useLogin(options?: UseLoginOptions) {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useAppMutation<{ data: LoginResponse; accessToken: string | null }, LoginRequest>(
    (data) => login(data),
    {
      onSuccess: async (res) => {
        if (res.data.isSuccess && res.accessToken) {
          const meRes = await getMe();
          if (meRes.isSuccess) {
            setAuth(meRes.result, res.accessToken, options?.rememberMe ?? false);
            toast.success('로그인에 성공하셨습니다!');
            navigate('/onboarding');
          }
        } else {
          toast.error('로그인에 실패했습니다.');
        }
      },
    }
  );
}
