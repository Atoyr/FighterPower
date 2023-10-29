import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, 
  signInWithPopup,
  signInAnonymously,
  signOut,
  linkWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  linkWithCredential,
  OAuthCredential,
  EmailAuthProvider,
  updateProfile,
  UserCredential,
  User,
  AuthProvider , 
} from "firebase/auth";

import { auth } from './firebase';

export type AuthParameter = {
  __type : "auth_parameter";
  AuthType : string;
  displayName? : string;
};

export const SignUp = (param: AuthParameter, callback: (user: UserCredential) => void, errorCallback: (e : Error) => void) => {
  let authProvider : AuthProvider | null = null;
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

  signInWithPopup(auth, authProvider!)
  .then(result => {
    updateProfile(result.user, { displayName: result.user.providerData[0].displayName});
    return result;
      })
  .then(resutl => callback(resutl))
  .catch(e => errorCallback(e));
}

export const SignIn = (param: AuthParameter, callback: (user: UserCredential) => void, errorCallback: (e : Error) => void) => {
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
        signInAnonymously(auth)
        .then(result => callback(result))
        .catch(e => errorCallback(e));
        return;
    default:
        errorCallback(new Error("AuthType Not Found"));
        return;
  }

  signInWithPopup(auth, authProvider!)
  .then(result => {
    updateProfile(result.user, { displayName: result.user.providerData[0].displayName});
    return result;
      })
  .then(result => callback(result))
  .catch(e => errorCallback(e));
}

export const SignOut = (callback: VoidFunction, errorCallback: (e : Error) => void) => {
  signOut(auth)
    .then(() => callback())
    .catch(e => errorCallback(e));
}

export const AccountLink = (param: AuthParameter, user: User, callback: (user: UserCredential) => void, errorCallback: (e : Error) => void) => {
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
        break; default:
        errorCallback(new Error("AuthType Not Found"));
        return;
  }

  linkWithPopup(user, authProvider!)
  .then(result => {
    updateProfile(result.user, { displayName: result.user.providerData[0].displayName});
    return result;
      })
  .then(result => callback(result))
  .catch(e => errorCallback(e));
};
