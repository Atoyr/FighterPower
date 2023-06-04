import { FallbackProps } from "react-error-boundary";

import { 
  Button, 
  Box, 
  Link, 
  SvgIcon, 
  Typography, 
  } from '@mui/material';

import { saveErrorLog } from '@/api';
import { ReactComponent as logo } from '@/assets/logo.svg'

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  saveErrorLog(error);
  return (
    <Box role="alert" sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center'}} >
      <SvgIcon component={logo} inheritViewBox sx={{width: "480px" , height: "480px", verticalAlign:"middle"}}/>
      <Typography>Sorry. This site throw error</Typography>
      <Link component="a" href="https://docs.google.com/forms/d/e/1FAIpQLSfUgGqGGmL179veX-TBtRG7eVw-6YUm56hfO3MjX1kAGa81Iw/viewform" >
        <Typography>お問い合わせはこちら</Typography>
      </Link>
      <Button onClick={resetErrorBoundary}>リロード</Button>
    </Box>
  );
};

