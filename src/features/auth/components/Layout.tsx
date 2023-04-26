import Container from '@mui/material/Container';
import { Head } from '@/components/Head';
import { PublicLayout } from '@/components/Layout';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const Layout = ({ children, title}: LayoutProps ) => {
  return(
  <PublicLayout >
    <Head title={title} />
      <Container component="main" maxWidth="xs">
        {children}
      </Container>
  </PublicLayout>
  );
};
