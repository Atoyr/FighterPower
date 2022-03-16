import * as React from 'react';
import {
  useLocation,
  Navigate,
} from 'react-router-dom';
import { useAuthContext } from 'context/AuthProvider';

function RequireAuth({ children }: { children: JSX.Element }) {
  let authContext = useAuthContext();
  let location = useLocation();

  if (authContext.authState.user == null || !authContext.authState.user.emailVerified) {
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }
  return children;
}

function NotRequireAuth({ children }: { children: JSX.Element }) {
  let authContext = useAuthContext();
  let location = useLocation();

  if (authContext.authState.user != null && authContext.authState.user.emailVerified) {
    return <Navigate to='/home' state={{ from: location }} replace />;
  }
  return children;
}

export { RequireAuth, NotRequireAuth }
