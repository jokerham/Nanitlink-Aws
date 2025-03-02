import { AppBar, Box, Divider, Link, Toolbar, Typography } from '@mui/material';
import { signOut } from 'aws-amplify/auth';
import { useUser } from 'component/amplify/AdminAuthorized';
import { HorizontalBox } from 'component/customMui';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const user = useUser();
  const navigate = useNavigate();

  const signOutHandler = () => {
    signOut();
    navigate('/');
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant="h1">
          Admin Portal
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Link component={NavLink} to="/"><Typography variant='h6'>http://www.nanitelink.com</Typography></Link>
        </Box>
        <HorizontalBox sx={{height: 32}}>
          <Link><Typography variant='h5'>{user?.userAttributes?.userName}</Typography></Link>
          <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: 'rgba(0,0,0,0.12)' }} />
          <Link onClick={signOutHandler}><Typography variant='h5'>Sign Out</Typography></Link>
          <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: 'rgba(0,0,0,0.12)' }} />
          <Link><Typography variant='h5'>English</Typography></Link>
        </HorizontalBox>
      </Toolbar>
    </AppBar>
  );
};

export default Header;