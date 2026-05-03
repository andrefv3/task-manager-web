import { createBrowserRouter } from 'react-router-dom';
import { ProtectedGuard, PublicGuard } from './RouteGuards';
import { lazyImport } from '@/shared/utils/LazyImport';

// Pages
const LoginPage = lazyImport(() => import('@/features/auth/pages/LoginPage'), 'LoginPage');
const RegisterPage = lazyImport(() => import('@/features/auth/pages/RegisterPage'), 'RegisterPage');
const DashboardPage = lazyImport(() => import('@/features/tasks/pages/DashboardPage'), 'DashboardPage');

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