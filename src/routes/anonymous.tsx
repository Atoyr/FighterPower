import { Outlet } from "react-router-dom";

import { lazyImport } from '@/utils/lazyImport';
import { RequireAnonymous } from '@/components/Auth';

const { AnonymousRoutes } = lazyImport(() => import('@/features/auth'), 'AnonymousRoutes');

const Check = () => {
  return(
    <RequireAnonymous>
      <Outlet />
    </RequireAnonymous>
  );
};

export const anonymousRoutes = [
  {
    path: '/anonymous',
    element: <Check />, 
    children: [
      { path: '*', element: <AnonymousRoutes /> }
    ]
  },
]


