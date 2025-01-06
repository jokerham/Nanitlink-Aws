import { createTheme } from '@mui/material/styles';

// Custom MUI theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007bff', // Blue accent color
    },
    background: {
      default: '#f8f9fa', // Light gray background
      paper: '#ffffff', // White background for cards
    },
    text: {
      primary: '#343a40', // Dark gray text
      secondary: '#6c757d', // Lighter gray for secondary text
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.3rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      color: '#343a40',
    },
    button: {
      textTransform: 'none', // Disable uppercase for buttons
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          textTransform: 'none',
          padding: '6px 12px',
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '16px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;