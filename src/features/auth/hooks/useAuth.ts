import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import type { LoginCredentials, RegisterCredentials } from '@/shared/types';
import { authService } from '../api/auth.service';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.actions.logout);
  
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
    logout();
    
    // Cleanup for security: redirect and reset navigation stack
    navigate('/login', { replace: true });
  };

  const handleGoogleAccess = async (tokenResponse: { access_token: string; }) => {
    try {
      const res = await authService.AccessWithGoogle(tokenResponse.access_token);
      // Save to Store (Zustand), set cookie, and redirect to Dashboard
      setLoginState(res.user, res.access_token);
      navigate('/dashboard');
    } catch { 
      toast.error("Error al conectar con Google");
    }
  };

  return {
    user,
    isAuthenticated,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    handleGoogleAccess,
  };
};