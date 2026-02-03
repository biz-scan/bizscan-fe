import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { type MutationOptions, useAppMutation } from '@/apis/apiHooks';
import { getMe, login, signup } from '@/apis/auth/auth';
import useAuthStore from '@/store/useAuthStore';
import type { SignupRequest, SignupResponse } from '@/types/auth.type';

export function useSignup(options?: MutationOptions<SignupResponse, SignupRequest>) {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  return useAppMutation<SignupResponse, SignupRequest>((data) => signup(data), {
    onSuccess: async (res, variables) => {
      if (res.isSuccess) {
        toast.success('환영합니다! 사장님의 성공 파트너 BizScan입니다.');

        const loginRes = await login({ email: variables.email, password: variables.password });
        if (loginRes.data.isSuccess && loginRes.accessToken) {
          const meRes = await getMe();
          if (meRes.isSuccess) {
            setAuth(meRes.result, loginRes.accessToken, false);
            navigate('/onboarding');
            return;
          }
        }
        navigate('/auth');
      } else {
        toast.error('입력 정보를 다시 확인해주세요.');
      }
    },
    ...options,
  });
}
