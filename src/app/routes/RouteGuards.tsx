import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/features/auth';

export const ProtectedGuard = () => {
  const isAuth = useAuthStore(s => s.isAuthenticated);
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicGuard = () => {
  const isAuth = useAuthStore(s => s.isAuthenticated);
  return !isAuth ? <Outlet /> : <Navigate to="/" replace />;
};