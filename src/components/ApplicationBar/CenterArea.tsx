
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import SvgIcon from '@mui/material/SvgIcon';

import { ReactComponent as logo } from '@/assets/logo.svg'
import { useAuth } from '@/hooks';

export const CenterArea = () => {
  const authState = useAuth();
  const to = authState.user == null ? "/" : "home";
  return (
    <Box sx={{flexGrow: 1, px: 0.5, display: 'block', flexDirection: 'row', textAlign: 'center', justifyContent: 'center'}}>
      <Link to={to} style={{ display: 'block', alignItems: 'center', justifyContent: 'center'}}>
        <SvgIcon component={logo} inheritViewBox sx={{width: "48px" , height: "48px", verticalAlign:"middle"}}/>
      </Link>
    </Box>
  );
};


