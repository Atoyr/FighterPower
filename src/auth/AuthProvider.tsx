import * as React from "react";
import { useEffect } from "react";
import { fakeAuthProvider } from "./auth";
import { firebaseAuth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { User } from "data/user"

export type AuthParameter = {
  __type : "auth_parameter";
  AuthType : string;
  email? : string;
  password? : string;
};

export interface AuthContextType {
  user: User;
  signup: (param: AuthParameter, callback: VoidFunction) => void;
  signin: (param: AuthParameter, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signup = (param: AuthParameter, callback: VoidFunction) => {
      // setUser(newUser);
      callback();
  };

  let signin = (param: AuthParameter, callback: VoidFunction) => {
    return () => {
      switch (param.AuthType) {
        case "EmailAndPassword":
          signInWithEmailAndPassword(firebaseAuth, param.email as string, param.password as string);
          break;
      }

      // setUser(newUser);
      callback();
    };
  };

  let signout = (callback: VoidFunction) => {
    return () => {
      firebaseAuth.signOut();
      callback();
    };
  };

  let value = { user, signup, signin, signout };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log(user);
    });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

export { AuthProvider, useAuth }
