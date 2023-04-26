import { useNavigate, useLocation, Location } from 'react-router-dom';

import { SignUpForm } from '../components/SignUpForm';
import { Layout } from '../components/Layout';

export const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state as { from: Location | null};
  const to = from ? from.pathname : '/home';
  return (
    <Layout title={"signup"}>
      <SignUpForm onSuccess={() => navigate(to, {replace: true} )}/>
    </Layout >
  );
}

