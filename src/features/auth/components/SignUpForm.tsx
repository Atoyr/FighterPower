import { Link as RouterLink } from "react-router-dom";

import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import SvgIcon from '@mui/material/SvgIcon';

import { ReactComponent as logo } from '@/assets/logo.svg'
import { SignUp } from '@/lib/auth';

type SignUpFormProps = {
  onSuccess: () => void;
}

export const SignUpForm = ({ onSuccess }: LoginFormProps) => {
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
            onClick={() => SignUp({ AuthType: "GoogleAuth" },(_) => onSuccess(), (e) => console.log(e.Message)) }
            startIcon={<GoogleIcon />}
            color="secondary"
            sx={{ mt: 3, mb: 2, textTransform: 'none' }} >
            {"Googleで登録"}
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => SignUp({ AuthType: "TwitterAuth" },(_) => onSuccess(), (e) => console.log(e.Message)) }
            startIcon={<TwitterIcon />}
            sx={{ mb: 2, textTransform: 'none'  }} >
            {"Twitterで登録"}
          </Button>
        </Paper>
  );
}

