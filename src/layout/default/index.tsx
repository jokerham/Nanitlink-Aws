import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1>Deafult Layout</h1>
      </div>
    </ThemeProvider>
  );
}

export default Layout;