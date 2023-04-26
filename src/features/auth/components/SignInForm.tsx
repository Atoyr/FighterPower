// import * as React from 'react';
// import { useLocation, useNavigate } from "react-router-dom";
// import { sendEmailVerification } from 'firebase/auth';
// import { AuthError } from "firebase/auth";
// 
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import SvgIcon from '@mui/material/SvgIcon';
import { Google, Twitter } from '@mui/icons-material';

import { ReactComponent as logo } from '@/assets/logo.svg'
import { SignIn } from '@/lib/auth';

type SignInFormProps = {
  onSuccess: () => void;
}

export const SignInForm = ({ onSuccess }: LoginFormProps) => {
   return (
         <Paper
           elevation={3}
           sx={{
             marginTop: 8, px: 2,
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
             onClick={() => SignIn({ AuthType: "GoogleAuth" },(_) => onSuccess(), (e) => console.log(e.Message)) }
             startIcon={<Google />}
             color="secondary"
             sx={{ mt: 3, mb: 2, textTransform: 'none' }} >
             {"Googleでログイン"}
           </Button>
           <Button
             fullWidth
             variant="contained"
             onClick={() => SignIn({ AuthType: "TwitterAuth" },(_) => onSuccess(), (e) => console.log(e.Message)) }
             startIcon={<Twitter />}
             sx={{ mb: 2, textTransform: 'none'  }} >
             {"Twitterでログイン"}
           </Button>
         </Paper>
   );
 };
