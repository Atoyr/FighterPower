import * as React from 'react';
import { useNavigate, Outlet, Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
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
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SvgIcon from '@mui/material/SvgIcon';

import { useAuthContext } from 'context/AuthProvider';
import { useUserContext } from 'context/UserProvider';
import { ReactComponent as Logo } from 'assets/logo.svg';


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
                <Box sx={{display: "flex"}}>
                    <SvgIcon component={Logo} inheritViewBox sx={{width: "48px" , height: "48px", verticalAlign:"middle"}}/>
                    <Typography variant="h6" component="div" color="text.secondary" align="center" sx={{verticalAlign:"middle", my: "auto", mx: 1}}>
                      FighterPower
                    </Typography>
                </Box>
              </Box>
                { auth.authState.user == null ?
                ( <List>
                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to="/signin" onClick={handleCloseNavMenu} >
                    <ListItemText primary="SignIn" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to="/signup" onClick={handleCloseNavMenu} >
                    <ListItemText primary="SignUp" />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton component="a" href="https://docs.google.com/forms/d/e/1FAIpQLSfUgGqGGmL179veX-TBtRG7eVw-6YUm56hfO3MjX1kAGa81Iw/viewform" onClick={handleCloseNavMenu} >
                    <ListItemText primary="お問い合わせ" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to="/terms" onClick={handleCloseNavMenu} >
                    <ListItemText primary="利用規約" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={RouterLink} to="/privacy" onClick={handleCloseNavMenu} >
                    <ListItemText primary="プライバシーポリシー" />
                  </ListItemButton>
                </ListItem>
              </List>)
                :
                (<List>
                  <ListItem disablePadding>
                    <ListItemButton component={RouterLink} to="/home" onClick={handleCloseNavMenu} >
                      <ListItemText primary="Home" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                  { auth.authState.user.isAnonymous && 
                  <ListItem disablePadding>
                    <ListItemButton component={RouterLink} to="/account_link" onClick={handleCloseNavMenu} >
                      <ListItemText primary="アカウント連携" />
                    </ListItemButton>
                  </ListItem>
                  }
                  { auth.authState.user.isAnonymous && 
                    <Divider />
                  }
                  <ListItem disablePadding>
                    <ListItemButton component="a" href="https://docs.google.com/forms/d/e/1FAIpQLSfUgGqGGmL179veX-TBtRG7eVw-6YUm56hfO3MjX1kAGa81Iw/viewform" onClick={handleCloseNavMenu} >
                      <ListItemText primary="お問い合わせ" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component={RouterLink} to="/terms" onClick={handleCloseNavMenu} >
                      <ListItemText primary="利用規約" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component={RouterLink} to="/privacy" onClick={handleCloseNavMenu} >
                      <ListItemText primary="プライバシーポリシー" />
                    </ListItemButton>
                  </ListItem>
                </List>
                )}
            </Box>
          </SwipeableDrawer>
        </Box>
    );
  };

  const CenterArea = () => {
    const to = auth.authState.user == null ? "/" : "home";
    return (
      <Box sx={{flexGrow: 1, px: 0.5, display: 'block', flexDirection: 'row', textAlign: 'center', justifyContent: 'center'}}>
        <Link to={to} style={{ display: 'block', alignItems: 'center', justifyContent: 'center'}}>
          <SvgIcon component={Logo} inheritViewBox sx={{width: "48px" , height: "48px", verticalAlign:"middle"}}/>
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
    } else if ( auth.authState.user.isAnonymous) {
      return(
        <Box sx={{ flexGrow: 0 , px: 0.5}}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mx: 0.5 }}>
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
            open={openUserMenu}
            onClose={handleCloseUserMenu}
          > 
            <MenuItem key="account_link" onClick={() => navigate('/account_link', { replace: true })}>{"アカウント連携"}</MenuItem>
          </Menu>
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
