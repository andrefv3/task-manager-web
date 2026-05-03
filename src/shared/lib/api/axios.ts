import axios from 'axios';
import { useAuthStore } from '@/features/auth/store/authStore'; 

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor of Request: Inject Token
api.interceptors.request.use((config) => {
  // Instead of localStorage, we use the Store state (Source of truth)
  const token = useAuthStore.getState().token;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor of Response: Global Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // We use the logout action from your Store to clear ALL state
      // This is better than manually clearing localStorage
      useAuthStore.getState().actions.logout();
      
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;