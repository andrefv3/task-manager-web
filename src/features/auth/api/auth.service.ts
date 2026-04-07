import api from '@/shared/lib/api/axios';
import { AUTH_ENDPOINTS } from './auth.endpoints';
import type { AuthResponse, LoginCredentials, RegisterCredentials } from '@/shared/types';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await api.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, credentials);
    return data;
  },

  register: async (credentials: RegisterCredentials) => {
    const { data } = await api.post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, credentials);
    return data;
  },

  verifyToken: async () => {
    const { data } = await api.get<AuthResponse>(AUTH_ENDPOINTS.ME);
    return data;
  }
};