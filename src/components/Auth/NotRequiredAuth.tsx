import {
  useLocation,
  Navigate,
} from 'react-router-dom';

import { useAuth } from '@/hooks';

type NotRequiredAuthProps = {
  children: React.ReactNode, 
  string: redirectTo, 
}

export const NotRequiredAuth = ({ children, redirectTo }: NotRequiredAuthProps) => {
  const authState = useAuth();
  let location = useLocation();

  if (authState?.user){
    return <Navigate to={redirectTo ?? '/'} state={{ from: location }} replace />;
  }
  return children;
}

