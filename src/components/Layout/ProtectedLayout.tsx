import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import SvgIcon from '@mui/material/SvgIcon';
import TwitterIcon from '@mui/icons-material/Twitter';

import { ReactComponent as logo } from '@/assets/logo.svg'
import { Footer } from '../Footer';

type ProtectedLayoutProps = {
  children: React.ReactNode
}

export const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {children}
      <Box
        component="footer"
        sx={{
          py: 1,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="lg">
          <Footer />
        </Container>
      </Box>
    </Box>
  );
}



