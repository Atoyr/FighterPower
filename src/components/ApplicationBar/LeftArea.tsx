import { Link as RouterLink } from "react-router-dom";
import { atom, useRecoilState } from 'recoil';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import SvgIcon from '@mui/material/SvgIcon';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { useAuth } from '@/hooks';
import { ReactComponent as logo } from '@/assets/logo.svg'

const openLeftMenuState = atom<boolean>({
  key: 'components_ApplcationBar_openLeftMenu',
  default: false, 
})

type ItemProps = {
  to: string;
  label: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const Item = ({to, label, onClick}: ItemProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton component={RouterLink} to={to} onClick={onClick} >
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
};

export const LeftArea = () => {
  const authState = useAuth();

  const [openLeftMenu, setOpenLeftMenu] = useRecoilState(openLeftMenuState);
  const handleOpenLeftMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenLeftMenu(true);
  };
  const handleCloseLeftMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenLeftMenu(false);
  };

  return (
      <Box sx={{ flexGrow: 0, px: 0.5 }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenLeftMenu}
          color="inherit" >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          anchor="left"
          open={openLeftMenu}
          onOpen={handleOpenLeftMenu}
          onClose={handleCloseLeftMenu} >
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
                onClick={handleCloseLeftMenu}
                color="inherit"
                sx={{ mx:0.5 }} >
                <CloseIcon />
              </IconButton>
              <Box sx={{display: "flex"}}>
                  <SvgIcon component={logo} inheritViewBox sx={{width: "48px" , height: "48px", verticalAlign:"middle"}}/>
                  <Typography variant="h6" component="div" color="text.secondary" align="center" sx={{verticalAlign:"middle", my: "auto", mx: 1}}>
                    FighterPower
                  </Typography>
              </Box>
            </Box>
            <List>
              { !authState.user ?
              ( 
                <>
                <Item to="/auth/signin" label="SignIn" onClick={handleCloseLeftMenu} />
                <Item to="/auth/signup" label="SignUp" onClick={handleCloseLeftMenu} />
                <Divider />
                </>
              )
              :
              (
                <>
                <Item to="/app/home" label="Home" onClick={handleCloseLeftMenu} />
                <Divider />
                { authState.user.isAnonymous && (
                  <>
                  <Item to="/anonymous/account_link" label="アカウント連携" onClick={handleCloseLeftMenu} />
                  <Divider />
                  </>
                  )
                }
                </>
              )}
              <Item to="/changelog" label="変更履歴" onClick={handleCloseLeftMenu} />
              <ListItem disablePadding>
                <ListItemButton component="a" href="https://docs.google.com/forms/d/e/1FAIpQLSfUgGqGGmL179veX-TBtRG7eVw-6YUm56hfO3MjX1kAGa81Iw/viewform" onClick={handleCloseLeftMenu} >
                  <ListItemText primary="お問い合わせ" />
                </ListItemButton>
              </ListItem>
              <Item to="/terms" label="利用規約" onClick={handleCloseLeftMenu} />
              <Item to="/privacy" label="プライバシーポリシー" onClick={handleCloseLeftMenu} />
            </List>
          </Box>
        </SwipeableDrawer>
      </Box>
    );
  };
