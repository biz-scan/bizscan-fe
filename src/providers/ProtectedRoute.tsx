import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useAuthStore from '@/store/useAuthStore';

export default function ProtectedRoute() {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();
  console.log(user);
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const hasStoreId = user?.storeId;

  // 분석 중인 상태인지 확인 (COMPLETED, FAILED, null이 아닌 경우)
  const isAnalyzing =
    user?.status === 'REQUEST' ||
    user?.status === 'SWOT_PROCESSING' ||
    user?.status === 'ACTION_PLAN_PROCESSING' ||
    user?.status === 'ACTION_DETAIL_PROCESSING';

  // 분석 중이면 분석 페이지로 리다이렉트 (이미 분석 페이지에 있는 경우 제외)
  if (isAnalyzing && user?.requestId) {
    const analysisPath = `/analyze/${user.requestId}`;
    if (!location.pathname.startsWith('/analyze')) {
      return <Navigate to={analysisPath} replace />;
    }
  }

  // 분석 중이 아닐 때 분석 페이지 접근 시 대시보드로 (선택 사항, 필요시 추가)
  // if (!isAnalyzing && location.pathname.startsWith('/analyze')) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  if (location.pathname === '/onboarding' && hasStoreId) {
    return <Navigate to="/dashboard" replace />;
  }

  if (location.pathname === '/dashboard' && !hasStoreId) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}
