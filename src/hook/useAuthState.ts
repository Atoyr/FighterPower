import { useEffect, useState } from 'react';
import { onAuthStateChanged, User as AuthUser } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { firebaseAuth, firebaseFirestore } from '../firebase';
import { User, UserConverter} from 'data/user';

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
}

export const useAuthState = (): AuthState => {
  const [ AuthState, setAuthState ] = useState<AuthState>({ user: null, loading: true});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      let authState = {
        user: user,
        loading: false,
      };
      setAuthState(authState);
    });
    return unsubscribe;
  }, [firebaseAuth]);

  return AuthState;
};
