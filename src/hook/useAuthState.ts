import { useEffect, useState } from 'react';
import { onAuthStateChanged, User as AuthUser } from 'firebase/auth';
import { firebaseAuth } from 'lib/firebase';

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
