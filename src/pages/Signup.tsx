import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { sendEmailVerification } from 'firebase/auth';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import SvgIcon from '@mui/material/SvgIcon';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuthContext } from 'context/AuthProvider'
import { AuthParameter } from 'data/authParameter'
import { useDocumentTitle } from 'hook/useDocumentTitle'
import { ReactComponent as Logo } from 'assets/logo.svg';

const theme = createTheme();

export default function SignUp() {
  useDocumentTitle("アカウント登録");
  const mode: string = (import.meta.env.MODE ?? "") as string;
  const [errormessage, setErrormessage] = React.useState<string>("");

  let navigate = useNavigate();
  let auth = useAuthContext();
  let from = "/home";

  const googleSignup = () => {
    let authParam = {
      AuthType: "GoogleAuth",
    } as AuthParameter;

    auth.signup(authParam,
      (user) => {
        navigate("/home", {replace: true} );
      },
      (e) => {
        console.log(e);
      });
  }
  const twitterSignup = () => {
    let authParam = {
      AuthType: "TwitterAuth",
    } as AuthParameter;

    auth.signup(authParam,
      (user) => {
        navigate("/home", {replace: true} );
      },
      (e) => {
        console.log(e);
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={3}
          sx={{
            marginTop: 8,
            px: 2,
            py: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{display: "flex", cursor: "default"}} >
            <SvgIcon component={Logo} inheritViewBox sx={{width: "48px" , height: "48px", verticalAlign:"middle", flexGrow: 0}}/>
            <Typography variant="h6" component="div" color="text.secondary" align="center" sx={{verticalAlign:"middle", my: "auto", mx: 1, flexGrow:0, userSelect: "none"}}>
              {"FighterPower"}
            </Typography>
          </Box>
          <Typography component="h1" variant="h5">
            {"FighterPowerへようこそ"}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={googleSignup}
            startIcon={<GoogleIcon />}
            color="secondary"
            sx={{ mt: 3, mb: 2, textTransform: 'none' }} >
            {"Googleで登録"}
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={twitterSignup}
            startIcon={<TwitterIcon />}
            sx={{ mb: 2, textTransform: 'none'  }} >
            {"Twitterで登録"}
          </Button>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
