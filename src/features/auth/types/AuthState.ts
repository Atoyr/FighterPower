import { User } from 'firebase/auth';

export type AuthState = {
  __type : "auth_status";
  user: User | null;
  loading: boolean;
}
