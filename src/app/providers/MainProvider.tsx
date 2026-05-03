import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
interface MainProviderProps {
  children: React.ReactNode;
}

export const MainProvider = ({ children }: MainProviderProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Global configurations
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    /* Data Provider  */
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          <Toaster 
              position="top-right" 
              toastOptions={{
              className: 'react-hot-toast-custom',
              duration: 3000,
              }} 
          />
          
          {children}
      </AuthProvider>
    </QueryClientProvider>
  );
};