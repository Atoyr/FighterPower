import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { sendEmailVerification } from 'firebase/auth';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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
import { AuthError } from "firebase/auth";
import { ReactComponent as Logo } from 'assets/logo.svg';

const theme = createTheme();

function implementsAuthError(arg: any): arg is AuthError {
  return arg !== null &&
    typeof arg === "object"
}

export default function AccountLink() {
  useDocumentTitle("アカウント連携");
  const mode: string = (import.meta.env.MODE ?? "") as string;
  const [errormessage, setErrormessage] = React.useState<string>("");

  let navigate = useNavigate();
  let auth = useAuthContext();
  let from = "/home";

  const handleSignOut = () => {
    auth.signout(() => { navigate('/', { replace: true })}
    , (e) => {console.log(e)});
  };

  const googleLink = () => {
    let authParam = {
      AuthType: "GoogleAuth",
    } as AuthParameter;

    auth.accountlink(authParam, auth.authState.user!,
      (user) => {
        navigate("/home", {replace: true} );
      },
      (e) => {
        setErrormessage(e.message);
      });
  }

  const twitterLink = () => {
    let authParam = {
      AuthType: "TwitterAuth",
    } as AuthParameter;

    auth.accountlink(authParam, auth.authState.user!,
      (user) => {
        navigate("/home", {replace: true} );
      },
      (e) => {
        setErrormessage(e.message);
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
         { errormessage != "" && <Alert severity="error">{errormessage}</Alert> }
          <Button
            fullWidth
            variant="contained"
            onClick={googleLink}
            startIcon={<GoogleIcon />}
            color="secondary"
            sx={{ mt: 3, mb: 2, textTransform: 'none' }} >
            {"Googleでログイン"}
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={twitterLink}
            startIcon={<TwitterIcon />}
            sx={{ mb: 2, textTransform: 'none'  }} >
            {"Twitterでログイン"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link onClick={handleSignOut} variant="body2">
                お試しデータを破棄
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

