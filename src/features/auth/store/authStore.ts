import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/shared/types';
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialLoading: boolean; 
  actions: {
    login: (user: User, token: string) => void;
    logout: () => void;
    checkAuth: () => Promise<void>;
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isInitialLoading: true, 

      actions: {
        login: (user, token) => {
          set({ user, token, isAuthenticated: true, isInitialLoading: false });
        },

        logout: () => {
          set({ user: null, token: null, isAuthenticated: false, isInitialLoading: false });
          useAuthStore.persist.clearStorage();
          localStorage.clear();
        },

        checkAuth: async () => {
          const { token } = get();
          
          if (!token) {
            set({ isAuthenticated: false, isInitialLoading: false });
            return;
          }
          
          try {
            // Simulation of an API call to validate the token and fetch user data
            // const user = await authService.getMe(); 
            set({ isAuthenticated: true, isInitialLoading: false });
          } catch (error) {
            get().actions.logout();
          }
        },
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        token: state.token,
        user: state.user 
      }),
    }
  )
);

export const useAuthActions = () => useAuthStore((s) => s.actions);