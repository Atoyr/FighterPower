import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import { useAuth } from '@/hooks';
import { SignOut } from '@/lib/auth';


const openRightMenuState = atom<boolean>({
  key: 'components_ApplcationBar_openRightMenu',
  default: false, 
})

export const RightArea = () => {
  const authState = useAuth();
  const navigate = useNavigate();
  const [openRightMenu, setOpenRightMenu] = useState(openRightMenuState);

  const handleOpenRightMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenRightMenu(true);
  };
  const handleCloseRightMenu = () => {
    setOpenRightMenu(false);
  };
  const handleSignOut = () => {
    //TODO
    SignOut(() => {
        navigate('/', { replace: true });
    }, 
    (e) => {
      console.log(e);
    });
  };

  if ( authState.user == null)
  {
    return(
      <Box 
        sx={{ 
          flexGrow: 0 ,
          display: 'flex',
          flexDirection: 'row',
          borderRadius: 1,
          }}>
      </Box>
      );
  } else if ( authState.user.isAnonymous) {
    return(
      <Box sx={{ flexGrow: 0 , px: 0.5}}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenRightMenu} sx={{ p: 0, mx: 0.5 }}>
            <PersonAddAltIcon />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={openRightMenu}
          onClose={handleCloseRightMenu}
        > 
          <MenuItem key="account_link" onClick={() => navigate('/anonymous/account_link', { replace: true })}>{"アカウント連携"}</MenuItem>
        </Menu>
      </Box>
      );

  } else {
    return(
      <Box sx={{ flexGrow: 0 , px: 0.5}}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenRightMenu} sx={{ p: 0, mx: 0.5 }}>
            <Avatar alt={"user"} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={openRightMenu}
          onClose={handleCloseRightMenu}
        > 
          <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
        </Menu>
      </Box>
      );
  }
};
