import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from 'recoil';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';
import { Google, Twitter } from '@mui/icons-material';

import { ReactComponent as logo } from '@/assets/logo.svg'
import { AccountLink, SignOut } from '@/lib/auth';
import { authState } from '@/stores';

type AccountLinkProps = {
  onSuccess: () => void;
  onRemove: () => void;
}

export const AccountLinkForm = ({ onSuccess, onRemove}: LoginFormProps) => {
  const AuthState = useRecoilValue(authState);

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
      }); }

  return (
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
            <SvgIcon component={logo} inheritViewBox sx={{width: "48px" , height: "48px", verticalAlign:"middle", flexGrow: 0}}/>
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
            onClick={() => AccountLink({ AuthType: "GoogleAuth" },AuthState.user, (_) => onSuccess(), (e) => console.log(e.Message)) }
            startIcon={<Google />}
            color="secondary"
            sx={{ mt: 3, mb: 2, textTransform: 'none' }} >
            {"Googleでログイン"}
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => AccountLink({ AuthType: "TwitterAuth" },AuthState.user, (_) => onSuccess(), (e) => console.log(e.Message)) }
            startIcon={<Twitter />}
            sx={{ mb: 2, textTransform: 'none'  }} >
            {"Twitterでログイン"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link onClick={() => SignOut((_) => onRemove(), (e) => console.log(e.Message))} variant="body2">
                お試しデータを破棄
              </Link>
            </Grid>
          </Grid>
        </Paper>
  );
}


