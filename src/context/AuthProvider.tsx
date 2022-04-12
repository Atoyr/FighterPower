import * as React from "react";
import { firebaseAuth } from "lib/firebase";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  signInWithPopup,
  signInAnonymously,
  signOut,
  GoogleAuthProvider,
  TwitterAuthProvider,
  linkWithCredential,
  OAuthCredential,
  EmailAuthProvider,
  updateProfile,
  UserCredential,
  User,
} from "firebase/auth"
import { AuthProvider as FirebaseAuthProvider } from "firebase/auth"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { AuthParameter } from "data/authParameter"
import { useAuthState, AuthState } from "hook/useAuthState"

export interface AuthContextType {
  authState: AuthState;
  signup: (param: AuthParameter, callback: (user: UserCredential) => void, errorCallback: (e : Error) => void) => void;
  signin: (param: AuthParameter, callback: (user: UserCredential) => void, errorCallback: (e : Error) => void) => void;
  signout: (callback: VoidFunction, errorCallback: (e : Error) => void) => void;
  accountlink: (param: AuthParameter, user: User, callback: (user: UserCredential) => void, errorCallback: (e : Error) => void) => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

function signup(param: AuthParameter, callback: (user: UserCredential) => void, errorCallback: (e : Error) => void) {
  let authProvider : FirebaseAuthProvider | null = null;
  switch (param.AuthType) {
    case "GoogleAuth":
        const googleAuthProvider = new GoogleAuthProvider();
        googleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        authProvider = googleAuthProvider;
        break;
    case "TwitterAuth":
        authProvider = new TwitterAuthProvider();
        break;
    default:
        errorCallback(new Error("AuthType Not Found"));
        return;
  }

  signInWithPopup(firebaseAuth, authProvider!)
  .then(result => {
    console.log(result);
    updateProfile(result.user, { displayName: result.user.providerData[0].displayName});
    return result;
      })
  .then(resutl => callback(resutl))
  .catch(e => errorCallback(e));
}

function signin(param: AuthParameter, callback: (user: UserCredential) => void, errorCallback: (e : Error) => void){
  let authProvider : FirebaseAuthProvider | null = null;
  switch (param.AuthType) {
    case "GoogleAuth":
        const googleAuthProvider = new GoogleAuthProvider();
        googleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        authProvider = googleAuthProvider;
        break;
    case "TwitterAuth":
        authProvider = new TwitterAuthProvider();
        break;
    case "Anonymously":
        signInAnonymously(firebaseAuth)
        .then(resutl => callback(resutl))
        .catch(e => errorCallback(e));
        return;
    default:
        errorCallback(new Error("AuthType Not Found"));
        return;
  }

  signInWithPopup(firebaseAuth, authProvider!)
  .then(result => {
    updateProfile(result.user, { displayName: result.user.providerData[0].displayName});
    return result;
      })
  .then(resutl => callback(resutl))
  .catch(e => errorCallback(e));
}

function signout(callback: VoidFunction, errorCallback: (e : Error) => void) {
  signOut(firebaseAuth)
    .then(() => callback())
    .catch(e => errorCallback(e));
}

function accountlink (param: AuthParameter, user: User, callback: (user: UserCredential) => void, errorCallback: (e : Error) => void) {
  let authProvider : FirebaseAuthProvider | null = null;
  let credentialFromResult : (userCredential: UserCredential) => (OAuthCredential | null) = (userCredential) => { return null; };

  switch (param.AuthType) {
    case "GoogleAuth":
        const googleAuthProvider = new GoogleAuthProvider();
        googleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        authProvider = googleAuthProvider;
        credentialFromResult = GoogleAuthProvider.credentialFromResult;
        break;
    case "TwitterAuth":
        authProvider = new TwitterAuthProvider();
        credentialFromResult = TwitterAuthProvider.credentialFromResult;
        break;
    default:
        errorCallback(new Error("AuthType Not Found"));
        return;
  }
  signInWithPopup(firebaseAuth, authProvider!)
  .then(result => {
    linkWithCredential(user, credentialFromResult(result)!);
    return result;
  })
  .then(resutl => callback(resutl))
  .catch(e => errorCallback(e));
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const authState = useAuthState();
  const value = { authState, signup, signin, signout, accountlink };

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
