import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import type { LoginCredentials, RegisterCredentials } from '@/shared/types';
import { authService } from '../api/auth.service';

export const useAuth = () => {
  const navigate = useNavigate();
  
  // We extract state and actions separately (Zustand optimization)
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { login, logout } = useAuthStore((s) => s.actions);

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const data = await authService.login(credentials);
      
      // 1. Update the state with the logged-in user and token
      login(data.user, data.access_token);
      
      // 2. Navigate to the dashboard
      navigate('/', { replace: true });
    } catch (error) {
      // Or you could handle it here with a toast notification
      throw error; 
    }
  };

  const handleRegister = async (credentials: RegisterCredentials) => {
    try {
      const data = await authService.register(credentials);
      login(data.user, data.access_token);
      navigate('/', { replace: true });
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    logout();
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