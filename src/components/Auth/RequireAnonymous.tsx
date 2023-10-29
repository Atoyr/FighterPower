import {
  useLocation,
  Navigate,
} from 'react-router-dom';

import { useAuth } from '@/hooks';

type RequireAnonymousProps = {
  children: React.ReactNode, 
  redirectTo: string
}

export const RequireAnonymous = ({ children, redirectTo}: RequireAnonymousProps) => {
  const authState = useAuth();
  const location = useLocation();

  if (authState.user && authState.user.isAnonymous){
    return children;
  }
  return <Navigate to={redirectTo ?? '/'} state={{ from: location }} replace />;
}

