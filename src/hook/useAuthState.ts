import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';

import { firebaseAuth } from '../firebase';

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export const useAuthState = (): AuthState => {
  const [ AuthState, setAuthState ] = useState<AuthState>({ user: null, loading: true});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
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
