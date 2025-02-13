import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { ToastContainer } from 'react-toastify';
import { Container } from '@mui/material';
import { ColumnBox, RowBox } from 'component/customMui';
import Header from './Header';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <ColumnBox sx={{minHeight: '100vh', gap: 2}}>
        <Header />
        <Container sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <RowBox sx={{ flex: 1, display: 'flex', gap: 3 }}>
            {/* <SideMenu /> */}
            <ColumnBox sx={{ flex: 1 }}>
              <Outlet />
            </ColumnBox>
          </RowBox>
        </Container>
        {/* <Footer /> */}
      </ColumnBox>

      <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"/>
    </ThemeProvider>
  );
}

export default Layout;