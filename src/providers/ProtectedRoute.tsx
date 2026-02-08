import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';

export default function ProtectedRoute() {
  const { user, storeId: persistedStoreId, isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const hasStoreId = user?.storeId || persistedStoreId;

  if (location.pathname === '/onboarding' && hasStoreId) {
    return <Navigate to="/dashboard" replace />;
  }

  if (location.pathname === '/dashboard' && !hasStoreId) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}
