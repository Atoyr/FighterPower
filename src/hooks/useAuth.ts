import { useEffect } from 'react';

import { useRecoilState, useResetRecoilState } from 'recoil';

import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@/lib/firebase';
import { authState } from '@/stores';

export const useAuth = () => {
  const [AuthState, setAuthState] = useRecoilState(authState);
  const resetState = useResetRecoilState(authState);
  
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setAuthState({
          user: user,
          loading: false,
        });
      });
      return unsubscribe;
      }, [setAuthState, resetState]);
    return AuthState;
};


