import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as Logo } from 'assets/logo.svg';

export default function StickyFooter({ children, dtil }: { children: React.ReactNode, dtil: boolean }) {
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
          { dtil &&
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={6}>
                <Box sx={{display: "flex"}}>
                  <SvgIcon component={Logo} inheritViewBox sx={{width: "48px" , height: "48px", verticalAlign:"middle", flexGrow: 0}}/>
                  <Typography variant="h6" component="div" color="text.secondary" align="center" sx={{verticalAlign:"middle", my: "auto", mx: 1, flexGrow:0}}>
                    {"FighterPower"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8} md={6}>
                <Grid container spacing={2} justifyContent="space-around" alignItems="stretch">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" component="div" color="text.secondary" align="left" sx={{verticalAlign:"middle", my: "auto", mx: 1, flexGrow:0}}>
                      {"About"}
                    </Typography>
                    <Typography variant="subtitle2" component="div" color="text.secondary" align="left" sx={{verticalAlign:"middle", my: "auto", mx: 1, flexGrow:0}}>
                      <Link href="index">
                        {"Index"}
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" component="div" color="text.secondary" align="left" sx={{verticalAlign:"middle", my: "auto", mx: 1, flexGrow:0}}>
                      {"Legal"}
                    </Typography>
                    <Typography variant="subtitle2" component="div" color="text.secondary" align="left" sx={{verticalAlign:"middle", my: "auto", mx: 1, flexGrow:0}}>
                      <Link href="terms">
                        {"利用規約"}
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider />
          </Box>
          }
          <Box sx={{
            display: 'flex',
            flexDirection: {xs: 'column', sm: 'row' },
            justifyContent: 'center'
            }}>
            <Typography variant="body2" color="text.secondary" sx={{mx: 1 ,flexGrow : 1, textAlign:{ xs: 'left', sm: 'right'} }}>
              {'Copyright (c) UCHIYAMA Ryota'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{mx: 1 ,flexGrow : 1 }}>
              <Link color="inherit" href="/">
                 FighterPower
              </Link>{' '}
              {2022}
              {'.'}
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
