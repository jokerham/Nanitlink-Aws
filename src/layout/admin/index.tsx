import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import theme from './theme';
import Header from './Header';
import SideMenu from './SideMenu';
import Footer from './Footer';
import { Outlet } from 'react-router';
import { ColumnBox, RowBox } from '@/component/customMui';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminAuthorized from '@/component/amplify/AdminAuthorized';

const Layout = () => {
  return (
    <AdminAuthorized>
      <ThemeProvider theme={theme}>
        <Container sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
      <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"/>
    </AdminAuthorized>
  );
};

export default Layout;