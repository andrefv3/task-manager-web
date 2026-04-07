import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './AuthProvider';
// import { QueryClientProvider } from '@tanstack/react-query'; // Si usas React Query

interface MainProviderProps {
  children: React.ReactNode;
}

export const MainProvider = ({ children }: MainProviderProps) => {
  return (
    /* 1. Data Provider (opcional pero recomendado) */
    /* <QueryClientProvider client={queryClient}> */

    /* Authentication Provider */
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
      
    /* </QueryClientProvider> */
  );
};