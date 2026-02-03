import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAppMutation } from '@/apis/apiHooks';
import { logout } from '@/apis/auth/auth';
import useAuthStore from '@/store/useAuthStore';
import type { LogoutResponse } from '@/types/auth.type';

export function useLogout() {
  const { logout: clearAuth } = useAuthStore();
  const navigate = useNavigate();

  return useAppMutation<LogoutResponse, void>(
    () => logout(),
    {
      onSuccess: () => {
        clearAuth();
        toast.success('로그아웃 되었습니다.');
        navigate('/');
      },
      onError: () => {
        // 서버 에러가 나도 클라이언트는 로그아웃 처리
        clearAuth();
        navigate('/');
      },
    }
  );
}
