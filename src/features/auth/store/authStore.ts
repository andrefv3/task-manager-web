import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/shared/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  actions: {
    login: (user: User, token: string) => void;
    logout: () => void;
    checkAuth: () => Promise<void>; // AuthProvider's checkAuth function
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      actions: {
        login: (user, token) => {
          set({ user, token, isAuthenticated: true });
        },

        logout: () => {
          set({ user: null, token: null, isAuthenticated: false });
          // El middleware 'persist' limpiará el storage automáticamente
        },

        checkAuth: async () => {
          const { token } = get();
          if (!token) {
            get().actions.logout();
            return;
          }
          
          try {
            // Aquí podrías hacer una llamada al API para validar el token
            // const user = await userService.getMe();
            // set({ user, isAuthenticated: true });
          } catch (error) {
            get().actions.logout();
          }
        },
      },
    }),
    {
      name: 'auth-storage', // Nombre de la key en localStorage
      storage: createJSONStorage(() => localStorage),
      // Solo persistimos el usuario y el token, no las acciones
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

// Helper Hook para acceso rápido a acciones (Patrón de optimización)
export const useAuthActions = () => useAuthStore((s) => s.actions);