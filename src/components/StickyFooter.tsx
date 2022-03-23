import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

export default function StickyFooter({ children }: { children: React.ReactNode }) {
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
        <Container maxWidth="sm">
          <Typography variant="body1">
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {'Copyright (c) UCHIYAMA Ryota'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Link color="inherit" href="/">
               FighterPower
            </Link>{' '}
            {2022}
            {'.'}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
