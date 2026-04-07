// app/routes.tsx
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedGuard, PublicGuard } from './RouteGuards';

// Pages
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'));
const DashboardPage = lazy(() => import('@/features/tasks/pages/DashboardPage'));

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