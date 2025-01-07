import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import theme from './theme';
import Header from './Header';
import SideMenu from './SideMenu';
import Footer from './Footer';
import { Outlet } from 'react-router';
import { ColumnBox, RowBox } from 'component/customMui';

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh' }}>
        <ColumnBox sx={{minHeight: '100vh', gap: 2}}>
          <Header />
          <RowBox sx={{ flex: 1, display: 'flex', gap: 3 }}>
            <SideMenu />
            <ColumnBox sx={{ flex: 1 }}>
              <Outlet />
            </ColumnBox>
          </RowBox>
          <Footer />
        </ColumnBox>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;