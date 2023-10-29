import Container from '@mui/material/Container';
import { Title } from '@/components/Title';
import { PublicLayout } from '@/components/Layout';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const Layout = ({ children, title}: LayoutProps ) => {
  return(
  <PublicLayout >
    <Title title={title} />
      <Container component="main" maxWidth="xs">
        {children}
      </Container>
  </PublicLayout>
  );
};
