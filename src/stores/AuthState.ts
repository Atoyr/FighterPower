import { atom } from 'recoil';
import { AuthState as Auth } from '@/feature/auth/types';

export const AuthState = atom<Auth>({
  key: 'AuthState',
  default: {
    user: null, 
    loading: true, 
  }, 
  dangerouslyAllowMutability: true,
})
