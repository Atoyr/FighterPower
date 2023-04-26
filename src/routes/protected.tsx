import { Outlet } from "react-router-dom";

import { lazyImport } from '@/utils/lazyImport';
import { RequireAuth } from '@/components/Auth';
import { ProtectedLayout } from '@/components/Layout';
import { ApplicationBar } from '@/components/ApplicationBar';

const { Landing } = lazyImport(() => import('@/features/misc'), 'Landing');
const { ObjectivesList } = lazyImport(() => import('@/features/objectives'), 'ObjectivesList');

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
      { path: 'objectives_list', element: <ObjectivesList /> }
    ]
  },
];

