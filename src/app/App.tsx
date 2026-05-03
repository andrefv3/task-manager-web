import { RouterProvider } from 'react-router-dom';
import { MainProvider } from './providers/MainProvider';
import { router } from './routes/AppRouter';
import { useAuthActions, useAuthStore } from '@/features/auth';
import { useEffect } from 'react';

export const App = () => {
  const { checkAuth } = useAuthActions();
  const isInitialLoading = useAuthStore((s) => s.isInitialLoading);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isInitialLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-500 text-lg">Loading...</span>
      </div>
    );
  }
  
  return (
    <MainProvider>
      <RouterProvider router={router} />
    </MainProvider>
  );
}