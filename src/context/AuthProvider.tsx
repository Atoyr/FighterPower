import * as React from "react";
import { firebaseAuth } from "../firebase";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth"

import { AuthParameter } from "data/authParameter"
import { useAuthState, AuthState } from "hook/useAuthState"

export interface AuthContextType {
  authState: AuthState;
  signup: (param: AuthParameter, callback: VoidFunction) => void;
  signin: (param: AuthParameter, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let authState = useAuthState();

  let signup = (param: AuthParameter, callback: VoidFunction) => {
      createUserWithEmailAndPassword(firebaseAuth, param.email as string, param.password as string)
      .then(user => callback());
  };

  let signin = (param: AuthParameter, callback: VoidFunction) => {
      switch (param.AuthType) {
        case "EmailAndPassword":
          signInWithEmailAndPassword(firebaseAuth, param.email as string, param.password as string)
          .then(user => callback());
          break;
      }
  };

  let signout = (callback: VoidFunction) => {
      signOut(firebaseAuth)
      .then(() => callback());
  };

  let value = { authState, signup, signin, signout };

  return <AuthContext.Provider value={value}>{!authState.loading && children}</AuthContext.Provider>;
}

function useAuthContext() {
  return React.useContext(AuthContext);
}

export { AuthProvider, useAuthContext }
