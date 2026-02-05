import { type ReactNode, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { getMe, refreshToken } from '@/apis/auth/auth';
import { tokenStorage } from '@/lib/tokenStorage';
import useAuthStore from '@/store/useAuthStore';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setAuth, setInitialized, logout, isInitialized } = useAuthStore(
    useShallow((state) => ({
      setAuth: state.setAuth,
      setInitialized: state.setInitialized,
      logout: state.logout,
      isInitialized: state.isInitialized,
    }))
  );

  useEffect(() => {
    const initializeAuth = async () => {
      const token = tokenStorage.get();

      // 토큰이 없으면 비로그인 상태로 초기화 완료
      if (!token) {
        logout();
        setInitialized(true);
        return;
      }

      try {
        // 토큰이 있으면 유효성 검증 (getMe 호출)
        const meRes = await getMe();

        if (meRes.isSuccess) {
          // 토큰 유효 → 인증 상태 유지
          setAuth(meRes.result, token, tokenStorage.isPersisted());
        } else {
          // 토큰 무효 → refresh 시도
          await tryRefreshToken();
        }
      } catch {
        // getMe 실패 → refresh 시도
        await tryRefreshToken();
      } finally {
        setInitialized(true);
      }
    };

    const tryRefreshToken = async () => {
      try {
        const refreshRes = await refreshToken();

        if (refreshRes.isSuccess) {
          const { accessToken } = refreshRes.result;
          tokenStorage.set(accessToken, tokenStorage.isPersisted());

          // 새 토큰으로 유저 정보 조회
          const meRes = await getMe();
          if (meRes.isSuccess) {
            setAuth(meRes.result, accessToken, tokenStorage.isPersisted());
            return;
          }
        }

        // refresh 실패 → 로그아웃
        logout();
      } catch {
        // refresh 에러 → 로그아웃
        logout();
      }
    };

    initializeAuth();
  }, [setAuth, setInitialized, logout]);

  // 초기화 완료 전까지 로딩 표시 (또는 null)
  if (!isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
