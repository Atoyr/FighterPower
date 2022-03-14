import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import { useNavigate, Outlet, Link } from "react-router-dom";
import { useAuthContext } from 'context/AuthProvider';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import SiteLogo from './SiteLogo';

const ResponsiveAppBar = () => {
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenu(true);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  };

  const handleCloseNavMenu = () => {
    setOpenMenu(false);
  };

  const handleCloseUserMenu = () => {
  };

  let navigate = useNavigate();
  const handleSignin = () => {
    navigate("/signin");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  let auth = useAuthContext();

  const pages = ['Products', 'Pricing', 'Blog'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

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
          <Drawer
            anchor="left"
            open={openMenu}
            onClose={handleCloseNavMenu}
          >
            <Box
              sx={{ width: 250}}
              role="presentation"
            >
        <List>
            <ListItem button >
              <ListItemText primary={"foo"} />
            </ListItem>
        </List>
      </Box>
          </Drawer>
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
          <Button
            key='signin'
            onClick={() => navigate('/signin')}
            sx={{ my: 2, color: 'white', display: 'block', border:0 }}>
            SIGN IN
          </Button>
          <Button
            key='signin'
            onClick={() => navigate('/signup')}
            sx={{ my: 2, color: 'white', display: 'block', border:1, m: 2 }}>
            SIGN UP
          </Button>
        </Box>
        );
    } else {
      return(
        <Box sx={{ flexGrow: 0 , px: 0.5}}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
            open={false}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        );
    }
  };

  if ( auth.authState.user != null)
  {
  }
    return (
      <Box>
        <AppBar position="static">
            <Toolbar disableGutters>
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
