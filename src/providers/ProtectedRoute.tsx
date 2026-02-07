import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useAuthStore from '@/store/useAuthStore';

export default function ProtectedRoute() {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (location.pathname === '/onboarding' && user?.storeId) {
    return <Navigate to="/dashboard" replace />;
  }

  if (location.pathname === '/dashboard' && !user?.storeId) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}
