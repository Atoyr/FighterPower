import { Outlet } from "react-router-dom";

import { lazyImport } from '@/utils/lazyImport';
import { NotRequiredAuth } from '@/components/Auth';
import { ApplicationBar } from '@/components/ApplicationBar';

const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');

const Check = () => {
  return(
    <NotRequiredAuth redirectTo={'/app/home'}>
      <Outlet />
    </NotRequiredAuth>
  );
};

export const publicRoutes = [
  {
    path: '/auth',
    element: <Check />, 
    children: [
      { path: '*', element: <AuthRoutes /> }
    ]
  },
];
