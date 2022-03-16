import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useAuthContext } from 'context/AuthProvider';
import { useUserContext } from 'context/UserProvider';
import SiteLogo from './SiteLogo';

const ResponsiveAppBar = () => {
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  const [openUserMenu, setOpenUserMenu] = React.useState<boolean>(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenu(true);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenUserMenu(true);
  };

  const handleCloseNavMenu = () => {
    setOpenMenu(false);
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleSignOut = () => {
    auth.signout(() => { navigate('/', { replace: true })}
    , (e) => {console.log(e)});
  };

  let navigate = useNavigate();
  let auth = useAuthContext();
  let user = useUserContext();

  const LeftArea = () => {
    return (
        <Box sx={{ flexGrow: 0, px: 0.5 }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor="left"
            open={openMenu}
            onOpen={handleOpenNavMenu}
            onClose={handleCloseNavMenu}
          >
            <Box
              sx={{ width: 250}}
              role="presentation">
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  minHeight: 56,
                  height: 56,
                  backgroundColor: "primary.main",
                }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleCloseNavMenu}
                  color="inherit"
                  sx={{
                    mx:0.5
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <SiteLogo size={36} isTitle />
              </Box>
              <List>
                <ListItem disablePadding>
                  <ListItemButton component="a" href="home">
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </SwipeableDrawer>
        </Box>
    );
  };

  const CenterArea = () => {
    const to = auth.authState.user == null ? "/" : "home";
    return (
      <Box sx={{flexGrow: 1, px: 0.5, display: 'flex', flexDirection: 'row' }}>
        <Link to={to} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <SiteLogo size={36} isTitle />
        </Link>
      </Box>
    );
  };

  const RightArea = () => {

    if ( auth.authState.user == null)
    {
      return(
        <Box 
          sx={{ 
            flexGrow: 0 ,
            display: 'flex',
            flexDirection: 'row',
            borderRadius: 1,
            }}>
          {/*
          <Button
            key='signin'
            onClick={() => navigate('/signin')}
            sx={{ my: 2, color: 'white', display: 'block', border:0 }}>
            SIGN IN
          </Button>
          <Button
            key='signup'
            onClick={() => navigate('/signup')}
            sx={{ my: 2, color: 'white', display: 'block', border:1, m: 2 }}>
            SIGN UP
          </Button>
          */}
        </Box>
        );
    } else {
      return(
        <Box sx={{ flexGrow: 0 , px: 0.5}}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mx: 0.5 }}>
              <Avatar alt={user?.displayName ?? "user"} />
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
            open={openUserMenu}
            onClose={handleCloseUserMenu}
          > 
            <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
          </Menu>
        </Box>
        );
    }
  };

  return (
    <Box>
      <AppBar position="static" 
        sx={{
          minHeight: 56,
          height: 56
        }}>
          <Toolbar disableGutters
            sx={{
              minHeight: { xs:56, sm:56 },
              height: { xs:56, sm: 56 }
            }}>
            <LeftArea />
            <CenterArea />
            <RightArea />
          </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default ResponsiveAppBar;
