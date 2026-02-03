import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { type MutationOptions, useAppMutation } from '@/apis/apiHooks';
import { signup } from '@/apis/auth/auth';
import type { SignupRequest, SignupResponse } from '@/types/auth.type';

export function useSignup(options?: MutationOptions<SignupResponse, SignupRequest>) {
  const navigate = useNavigate();

  return useAppMutation<SignupResponse, SignupRequest>((data) => signup(data), {
    onSuccess: (res) => {
      if (res.isSuccess) {
        toast.success('회원가입 성공! 로그인해주세요.');
        navigate('/auth');
      } else {
        toast.error(res.message || '회원가입에 실패했습니다.');
      }
    },
    ...options,
  });
}
