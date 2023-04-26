import { useRoutes } from 'react-router-dom';

import { publicRoutes } from './public';
import { protectedRoutes } from './protected';
import { anonymousRoutes } from './anonymous';
import { commonRoutes } from './common';


export const AppRoutes = () => {

  const element = useRoutes([...publicRoutes, ...protectedRoutes, ...commonRoutes, ...anonymousRoutes]);

  return <>{element}</>;
}
