import * as React from "react";
import { firebaseAuth } from "lib/firebase";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  signInAnonymously,
  signOut,
  linkWithCredential,
  EmailAuthProvider,
  updateProfile,
  UserCredential,
  User,
} from "firebase/auth"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { AuthParameter } from "data/authParameter"
import { useAuthState, AuthState } from "hook/useAuthState"

export interface AuthContextType {
  authState: AuthState;
  signup: (param: AuthParameter, callback: (user: UserCredential) => void, errorCallback: (e : Error) => void) => void;
  signin: (param: AuthParameter, callback: (user: UserCredential) => void, errorCallback: (e : Error) => void) => void;
  signout: (callback: VoidFunction, errorCallback: (e : Error) => void) => void;
  accountlink: (param: AuthParameter, callback: (user: UserCredential) => void, errorCallback: (e : Error) => void) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let authState = useAuthState();

  let signup = (param: AuthParameter, callback: (user: UserCredential) => void, errorCallback: (e : Error) => void) => {
    let promise : Promise<UserCredential> | null = null;
    switch (param.AuthType) {
      case "EmailAndPassword":
        promise = createUserWithEmailAndPassword(firebaseAuth, param.email as string, param.password as string);
        break
    }

    if (promise == null ) {
      const e = new Error("AuthType Not Found");
      errorCallback(e);
    } else {
      promise
      .then(user => {
        updateProfile(user.user, { displayName: param.displayName ?? "" })
        return user;
      })
      .then(user => callback(user))
      .catch(e => errorCallback(e));
    }
  };

  let signin = (param: AuthParameter, callback: (user: UserCredential) => void, errorCallback: (e : Error) => void) => {
    let promise : Promise<UserCredential> | null = null;
    
    switch (param.AuthType) {
      case "Anonymously":
        promise = signInAnonymously(firebaseAuth);
      case "EmailAndPassword":
        promise = signInWithEmailAndPassword(firebaseAuth, param.email as string, param.password as string)
        break;
    }
    if (promise == null ) {
      const e = new Error("AuthType Not Found");
      errorCallback(e);
    } else {
      promise
      .then(user => callback(user))
      .catch(e => errorCallback(e));
    }
  };

  let signout = (callback: VoidFunction, errorCallback: (e : Error) => void) => {
      signOut(firebaseAuth)
      .then(() => callback())
      .catch(e => errorCallback(e));
  };

  let accountlink = (param: AuthParameter, callback: (user: UserCredential) => void, errorCallback: (e : Error) => void) => {
    if (!authState.user) {
      const e = new Error("user not found");
      errorCallback(e);
    }

    let promise : Promise<UserCredential> | null = null;
    
    switch (param.AuthType) {
      case "EmailAndPassword":
        const c = EmailAuthProvider.credential(param.email as string, param.password as string);
        promise = linkWithCredential(authState.user as User, c);
        break;
    }
    if (promise == null ) {
      const e = new Error("AuthType Not Found");
      errorCallback(e);
    } else {
      promise
      .then(user => callback(user))
      .catch(e => errorCallback(e));
    }
  };


  let value = { authState, signup, signin, signout, accountlink };

  return( 
    <AuthContext.Provider value={value}>
      {authState.loading ? 
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open >
          <CircularProgress color="inherit" />
        </Backdrop>
       : children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  return React.useContext(AuthContext);
}

export { AuthProvider, useAuthContext }
