import {
  useLocation,
  Navigate,
} from 'react-router-dom';

import { useAuth } from '@/hooks';

type RequireAuthProps = {
  children: React.ReactNode, 
  redirectTo: string
}

export const RequireAuth = ({ children, redirectTo }: RequireAuthProps) => {
  const authState = useAuth();
  let location = useLocation();

  if (!authState?.user){
    return <Navigate to={redirectTo ?? '/'} state={{ from: location }} replace />;
  }
  return children;
}
