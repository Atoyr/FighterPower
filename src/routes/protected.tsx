import { Outlet } from "react-router-dom";

import { lazyImport } from '@/utils/lazyImport';
import { RequireAuth } from '@/components/Auth';
import { ProtectedLayout } from '@/components/Layout';
import { ApplicationBar } from '@/components/ApplicationBar';

const { Landing } = lazyImport(() => import('@/features/misc'), 'Landing');
const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
const { Objectives } = lazyImport(() => import('@/features/objectives'), 'Objectives');

const Check = () => {
  return(
    <RequireAuth redirectTo={'/auth/signin'}>
      <ApplicationBar>
        <ProtectedLayout>
          <Outlet />
        </ProtectedLayout>
      </ApplicationBar>
    </RequireAuth>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <Check />,
    children: [
      { path: 'home', element: <Landing /> }, 
      { path: 'dashboard', element: <Dashboard /> }, 
      { path: 'objectives', element: <Objectives /> }
    ]
  },
];

