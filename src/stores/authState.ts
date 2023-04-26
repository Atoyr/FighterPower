import { atom } from 'recoil';
import { AuthState } from '@/feature/auth/types';

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    user: null, 
    loading: true, 
  }, 
  dangerouslyAllowMutability: true,
})
