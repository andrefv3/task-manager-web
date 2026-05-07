import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import type { LoginCredentials, RegisterCredentials } from '@/shared/types';
import { authService } from '../api/auth.service';

export const useAuth = () => {
  const navigate = useNavigate();
  
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { login: setLoginState, logout: setLogoutState } = useAuthStore((s) => s.actions);

  const handleLogin = async (credentials: LoginCredentials) => {
    const data = await authService.login(credentials);
    setLoginState(data.user, data.access_token);
    navigate('/', { replace: true });
  };

  const handleRegister = async (credentials: RegisterCredentials) => {
    const data = await authService.register(credentials);
    setLoginState(data.user, data.access_token);
    navigate('/', { replace: true });
  };

  const handleLogout = () => {
    setLogoutState();
    
    // Cleanup for security: redirect and reset navigation stack
    navigate('/login', { replace: true });
  };

  return {
    user,
    isAuthenticated,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};