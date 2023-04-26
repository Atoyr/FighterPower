import { Route,  Routes } from 'react-router-dom';

import { SignIn } from './Signin';
import { Signup } from './Signup';
import { AccountLink } from './AccountLink';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<SignIn />} />
    </Routes>
  );
};
export const AnonymousRoutes = () => {
  return (
    <Routes>
      <Route path="account_link" element={<AccountLink />} />
    </Routes>
  );
};
