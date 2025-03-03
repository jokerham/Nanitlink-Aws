import { ThemeProvider } from '@emotion/react';
import theme from './theme'
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover } from '@mui/material';
import { FaSignInAlt } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { signOut } from 'aws-amplify/auth';
import { NavLink } from 'react-router';
import AdminAuthorized from 'component/amplify/AdminAuthorized';

interface ISignInUserMenuProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const menus = [
  {menu: "View Member Info", action: () => {}},
  {menu: "Scraps", action: () => {}},
  {menu: "Saved Articles", action: () => {}},
  {menu: "Written Articles", action: () => {}},
  {menu: "Friends", action: () => {}},
  {menu: "Message Box", action: () => {}},
  {menu: "Scraps", action: () => {}},
]

const SignInUserMenu = ({open, anchorEl, onClose}: ISignInUserMenuProps) => {

  const signOutHandler = () => {
    signOut();
    onClose();
  }

  return (
    <ThemeProvider theme={theme}>
      <Popover 
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List>
          { menus.map((menu, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary={menu.menu} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider/>
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" onClick={() => signOutHandler()}>
            <ListItemIcon><FaSignInAlt /></ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          </ListItem>
          <AdminAuthorized>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/admin">
                <ListItemIcon><IoSettings /></ListItemIcon>
                <ListItemText primary="Manage" />
              </ListItemButton>
            </ListItem>
          </AdminAuthorized>
        </List>
      </Popover>
    </ThemeProvider>
  );
}

export default SignInUserMenu;
