import { useAuth } from '@/hooks';

import { Loading } from '@/components/Loading';

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const authState = useAuth();
  return (
  <>
    {authState.loading ? 
      <Loading />
    : children}
  </>
  );
};
