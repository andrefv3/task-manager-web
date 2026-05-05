import { createBrowserRouter } from 'react-router-dom';
import { ProtectedGuard, PublicGuard } from './RouteGuards';
import { lazyImport } from '@/shared/utils';

// Pages
const LoginPage = lazyImport(() => import('@/features/auth'), 'LoginPage');
const RegisterPage = lazyImport(() => import('@/features/auth'), 'RegisterPage');
const DashboardPage = lazyImport(() => import('@/features/tasks'), 'DashboardPage');

export const router = createBrowserRouter([
  {
    element: <PublicGuard />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  {
    element: <ProtectedGuard />,
    children: [
      { path: '/', element: <DashboardPage /> },
    ],
  },
]);