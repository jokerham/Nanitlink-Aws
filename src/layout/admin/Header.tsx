import { AppBar, Box, Divider, Link, Toolbar, Typography } from '@mui/material';
import { HorizontalBox } from 'component/customMui';

const Header = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant="h1">
          Admin Portal
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Link href="/"><Typography variant='h6'>http://www.nanitelink.com</Typography></Link>
        </Box>
        <HorizontalBox sx={{height: 32}}>
          <Link><Typography variant='h5'>jokerham@gmail.com</Typography></Link>
          <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: 'rgba(0,0,0,0.12)' }} />
          <Link><Typography variant='h5'>Sign Out</Typography></Link>
          <Divider orientation="vertical" variant="middle" flexItem sx={{ bgcolor: 'rgba(0,0,0,0.12)' }} />
          <Link><Typography variant='h5'>English</Typography></Link>
        </HorizontalBox>
      </Toolbar>
    </AppBar>
  );
};

export default Header;