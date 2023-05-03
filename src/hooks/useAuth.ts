import { useEffect } from 'react';

import { useRecoilState, useResetRecoilState } from 'recoil';

import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@/lib/firebase';
import { AuthState } from '@/stores';

export const useAuth = () => {
  const [authState, setAuthState] = useRecoilState(AuthState);
  const resetState = useResetRecoilState(AuthState);
  
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setAuthState({
          user: user,
          loading: false,
        });
      });
      return unsubscribe;
      }, [setAuthState, resetState]);
    return authState;
};


