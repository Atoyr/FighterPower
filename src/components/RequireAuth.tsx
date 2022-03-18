import * as React from 'react';
import {
  useLocation,
  Navigate,
} from 'react-router-dom';
import { useAuthContext } from 'context/AuthProvider';

function RequireAuth({ children }: { children: JSX.Element }) {
  let authContext = useAuthContext();
  let location = useLocation();

  if (!isAuth()) {
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }
  return children;
}

function NotRequireAuth({ children }: { children: JSX.Element }) {
  let authContext = useAuthContext();
  let location = useLocation();

  if (isAuth()) {
    return <Navigate to='/home' state={{ from: location }} replace />;
  }
  return children;
}

function RequireAnonymous({ children }: { children: JSX.Element }) {
  let authContext = useAuthContext();
  let location = useLocation();

  if (authContext.authState.user == null || !authContext.authState.user.isAnonymous){
    return <Navigate to='/' state={{ from: location }} replace />;
  }
  return children;
}

function isAuth() {
  let authContext = useAuthContext();
  const mode: string = (import.meta.env.MODE ?? "") as string;
  return authContext.authState.user != null && (authContext.authState.user.emailVerified || mode == "dev");
}

export { RequireAuth, NotRequireAuth, RequireAnonymous }
