import * as React from 'react';
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

type PublicLayoutProps = {
  children: React.ReactNode
}

const DtilLink = ({link, title} : {link: string, title: string}) => {
  return(
      <Typography variant="subtitle2" component="div" color="text.secondary" align="left" sx={{verticalAlign:"middle", my: "auto", mx: 1, flexGrow:0}}>
        <Link component={RouterLink} to={link}>
        {title}
        </Link>
      </Typography>
    );
};

export const PublicLayout = ({ children }: PublicLayoutProps) => {
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
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={6}>
                <Box sx={{display: "flex", cursor: "pointer"}} onClick={() => navigate("/index")}>
                  <SvgIcon component={logo} inheritViewBox sx={{width: "48px" , height: "48px", verticalAlign:"middle", flexGrow: 0}}/>
                  <Typography variant="h6" component="div" color="text.secondary" align="center" sx={{verticalAlign:"middle", my: "auto", mx: 1, flexGrow:0, userSelect: "none"}}>
                    {"FighterPower"}
                  </Typography>
                </Box>
                <Box>
                  <Link href="https://twitter.com/g_fighter_power">
                    <TwitterIcon color="primary" />
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8} md={6}>
                <Grid container spacing={2} justifyContent="space-around" alignItems="stretch">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" component="div" color="text.secondary" align="left" sx={{verticalAlign:"middle", my: "auto", mx: 1, flexGrow:0}}>
                      {"About"}
                    </Typography>
                    <DtilLink link="/index" title="Index"/>
                    <DtilLink link="/changelog" title="変更履歴"/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" component="div" color="text.secondary" align="left" sx={{verticalAlign:"middle", my: "auto", mx: 1, flexGrow:0}}>
                      {"Legal"}
                    </Typography>
                    <DtilLink link="/terms" title="利用規約"/>
                    <DtilLink link="/privacy" title="プライバシーポリシー"/>
                    <Typography variant="subtitle2" component="div" color="text.secondary" align="left" sx={{verticalAlign:"middle", my: "auto", mx: 1, flexGrow:0}}>
                      <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfUgGqGGmL179veX-TBtRG7eVw-6YUm56hfO3MjX1kAGa81Iw/viewform">
                        {"お問い合わせ"}
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider />
          </Box>
          <Footer />
        </Container>
      </Box>
    </Box>
  );
};
