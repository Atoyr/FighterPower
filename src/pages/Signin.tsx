import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { sendEmailVerification } from 'firebase/auth';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import GoogleIcon from '@mui/icons-material/Google';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuthContext } from 'context/AuthProvider'
import { AuthParameter } from 'data/authParameter'
import { useDocumentTitle } from 'hook/useDocumentTitle'
import { red } from '@mui/material/colors';
import { AuthError } from "firebase/auth";

const theme = createTheme();

function implementsAuthError(arg: any): arg is AuthError {
  return arg !== null &&
    typeof arg === "object"
}

export default function SignIn() {
  let navigate = useNavigate();
  let auth = useAuthContext();
  let from = "/home";
  useDocumentTitle("ログイン");
  const mode: string = (import.meta.env.MODE ?? "") as string;

  const [errormessage, setErrormessage] = React.useState<string>("");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrormessage("");

    let formData = new FormData(event.currentTarget);
    let email = formData.get('email') as string;
    let password = formData.get('password') as string;
    let authParam = {
      AuthType: "EmailAndPassword",
      email : email,
      password : password,
    } as AuthParameter;

    auth.signin(authParam,
      (user) => {
        if (user.user.emailVerified) {
          navigate(from, { replace: true });
        } else {
          // if(mode != "dev") {
          //   sendEmailVerification(user.user);
          // }
        }
      },
      (e) => {
        if (implementsAuthError(e) && (e as AuthError).code == "auth/wrong-password") {
          setErrormessage("メールアドレス または パスワードが異なります");
        } else {
          setErrormessage(e.message);
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {"FighterPower にログイン"}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            { errormessage != "" && <Alert severity="error">{errormessage}</Alert> }
            {/**
            <Button
              onClick={() => {}}
              fullWidth
              variant="contained"
              startIcon={<GoogleIcon />}
              sx={{ mt: 3, mb: 2 , textTransform: "none", backgroundColor: red[800]}} >
              {"Google アカウントでログイン"}
            </Button>
            <Divider />
            **/}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {"ログイン"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfUgGqGGmL179veX-TBtRG7eVw-6YUm56hfO3MjX1kAGa81Iw/viewform" variant="body2">
                  {"パスワードを忘れた場合"}
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"新規登録"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
