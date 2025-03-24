import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { ToastContainer } from 'react-toastify';
import { Container, Paper } from '@mui/material';
import { ColumnBox, RowBox } from '@/component/customMui';
import Header from './Header';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <ColumnBox sx={{minHeight: '100vh', gap: 2, backgroundColor: '#f1f1f1'}}>
        <Header />
        <Container sx={{display: 'flex', flexDirection: 'column', flex: 1 }}>
          <RowBox sx={{ flex: 1, gap: 3, minHeight: '100%' }}>
            {/* <SideMenu /> */}
            <ColumnBox sx={{ flex: 1, minHeight: '100%' }}>
              <Paper sx={{p: 2, borderRadius: 0, height: '100%'}}>
                <Outlet />
              </Paper>
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