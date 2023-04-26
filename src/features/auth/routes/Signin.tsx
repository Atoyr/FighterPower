import { useNavigate, useLocation, Location } from 'react-router-dom';

import { SignInForm } from '../components/SignInForm';
import { Layout } from '../components/Layout';

export const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state as { from: Location | null};
  const to = from ? from.pathname : '/home';
  return (
    <Layout title={"signin"}>
      <SignInForm onSuccess={() => navigate(to, {replace: true} )}/>
    </Layout >
  );
}


