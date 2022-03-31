import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { sendEmailVerification } from 'firebase/auth';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuthContext } from 'context/AuthProvider'
import { AuthParameter } from 'data/authParameter'
import { useDocumentTitle } from 'hook/useDocumentTitle'
import { AuthError } from "firebase/auth";

const theme = createTheme();

function implementsAuthError(arg: any): arg is AuthError {
  return arg !== null &&
    typeof arg === "object"
}

export default function SignUp() {
  useDocumentTitle("アカウント登録");
  const mode: string = (import.meta.env.MODE ?? "") as string;
  const [errormessage, setErrormessage] = React.useState<string>("");

  let navigate = useNavigate();
  let auth = useAuthContext();
  let from = "/home";
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrormessage("");

    const data = new FormData(event.currentTarget);
    console.log(data);
    const name = String(data.get('name'));
    const email = String(data.get('email'));
    const password = String(data.get('password'));
    if (password.length < 6 ) {
      setErrormessage("パスワードは6文字以上で設定してください");
      return;
    }

    let authParam = {
      AuthType: "EmailAndPassword",
      displayName: name,
      email : email,
      password : password,
    } as AuthParameter;

    auth.signup(authParam,
      (user) => {
        // if(mode != "dev") {
        //   sendEmailVerification(user.user);
        // }
        navigate("/home", {replace: true} );
      },
      (e) => {
        if (implementsAuthError(e) && (e as AuthError).code == "auth/wrong-password") {
          setErrormessage("メールアドレス または パスワードが異なります");
        } else if (implementsAuthError(e) && (e as AuthError).code == "auth/invalid-email") {
          setErrormessage("メールアドレスが有効ではありません");
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
            {"アカウント登録"}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            { errormessage != "" && <Alert severity="error">{errormessage}</Alert> }
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="ユーザ名"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="メールアドレス"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="パスワード"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }} >
              {"登録する"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signin" variant="body2">
                  {"アカウントをお持ちの方はこちら"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
