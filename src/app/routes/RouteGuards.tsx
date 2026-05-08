import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/features/auth';

export const ProtectedGuard = () => {
  const isAuth = useAuthStore(s => s.isAuthenticated);
  const isLoading = useAuthStore(s => s.isInitialLoading);

  // While loading the session from storage, we show nothing (or a spinner)
  if (isLoading) return <div className="h-screen w-full flex items-center justify-center">Loading session...</div>;

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicGuard = () => {
  const isAuth = useAuthStore(s => s.isAuthenticated);
  const isLoading = useAuthStore(s => s.isInitialLoading);

  // While loading the session from storage, we show nothing (or a spinner)
  if (isLoading) return null;

  return !isAuth ? <Outlet /> : <Navigate to="/" replace />;
};