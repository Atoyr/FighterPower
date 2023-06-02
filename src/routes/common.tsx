import { Outlet } from "react-router-dom";

import { MODE } from '@/config';
import { lazyImport } from '@/utils/lazyImport';

import { ApplicationBar } from '@/components/ApplicationBar';

const { PublicLayout } = lazyImport(() => import('@/components/Layout'), 'PublicLayout');
const { Debug } = lazyImport(() => import('@/features/misc'), 'Debug');
const { Landing } = lazyImport(() => import('@/features/misc'), 'Landing');
const { Privacy } = lazyImport(() => import('@/features/misc'), 'Privacy');
const { Changelog } = lazyImport(() => import('@/features/misc'), 'Changelog');
const { Terms } = lazyImport(() => import('@/features/misc'), 'Terms');
const { NotFound } = lazyImport(() => import('@/features/misc'), 'NotFound');

const Layout = () => {
  return(
      <ApplicationBar>
        <PublicLayout>
          <Outlet />
        </PublicLayout>
      </ApplicationBar>
  );
};

const DebugMode = () => {
  return ( MODE === "dev" ? <Debug /> : <NotFound />);
}

export const commonRoutes = [
  {
    path: '/', 
    element: <Layout />, 
    children: [
      { index: true, element: <Landing /> }, 
      { path: 'index', element: <Landing /> }, 
      { path: 'privacy', element: <Privacy />}, 
      { path: 'changelog', element: <Changelog />}, 
      { path: 'terms', element: <Terms />}, 
      { path: 'debug', element: <DebugMode />},
      { path: '*', element: <NotFound />}, 
    ]
  }, 
];

