import * as React from "react";
import {
  useLocation,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./AuthProvider";

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  console.log(auth)

  if (!auth.user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

function NotRequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (auth.user) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return children;
}

export { RequireAuth, NotRequireAuth }
