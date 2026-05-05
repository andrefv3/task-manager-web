import { useEffect, useState } from 'react';
import { useAuthStore } from '@/features/auth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const checkAuth = useAuthStore((s) => s.actions.checkAuth); // A function that checks the token in localStorage/cookies
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        await checkAuth();
      } finally {
        setIsInitializing(false);
      }
    };
    init();
  }, [checkAuth]);

  // if the app is still checking the token, we show a full-screen loader
  // This prevents flashing of protected routes for a split second before redirecting to login if the token is invalid or missing.
  if (isInitializing) {
    return <div className="full-screen-loader">Loading Application...</div>;
  }

  return <>{children}</>;
};