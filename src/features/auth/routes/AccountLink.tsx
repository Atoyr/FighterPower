import { useNavigate, useLocation, Location } from 'react-router-dom';

import { AccountLinkForm } from '../components/AccountLinkForm';
import { Layout } from '../components/Layout';

export const AccountLink = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state as { from: Location | null};
  const to = from ? from.pathname : '/home';
  return (
    <Layout title={"account link"}>
      <AccountLinkForm onSuccess={() => navigate(to, {replace: true} )} onRemove={() => navigate("/", {replace: true})} />
    </Layout >
  );
}



