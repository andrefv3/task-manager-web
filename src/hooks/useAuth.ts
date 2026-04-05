import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import type { AuthResponse } from '../types';

export const useAuth = () => {
  const { login, logout, user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    const { data } = await api.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    login(data.user, data.access_token);
    navigate('/dashboard');
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    const { data } = await api.post<AuthResponse>('/auth/register', {
      name,
      email,
      password,
    });
    login(data.user, data.access_token);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return {
    user,
    isAuthenticated,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};