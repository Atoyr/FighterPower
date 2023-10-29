import { Link as RouterLink } from "react-router-dom";

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export const Footer = () => {
  return(
          <Box sx={{
            display: 'flex',
            flexDirection: {xs: 'column', sm: 'row' },
            justifyContent: 'center'
            }}>
            <Typography variant="body2" color="text.secondary" sx={{mx: 1 ,flexGrow : 1, textAlign:{ xs: 'left', sm: 'right'} }}>
              {'Copyright (c) UCHIYAMA Ryota'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{mx: 1 ,flexGrow : 1 }}>
              <Link component={RouterLink} color="inherit" to="/">
                 FighterPower
              </Link>{' '}
              {2023}
              {'.'}
            </Typography>
          </Box>
    );
};
