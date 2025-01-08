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
    fontFamily: 'Tahoma, sans-serif', // Set primary font as Tahoma
    h1: {
      fontFamily: 'Arial, sans-serif', // Set h1 font as Arial
      fontSize: '24px', // Set h1 font size to 24px
      fontWeight: 600
    },
    h2: {
      color: '#666',
      fontFamily: 'Arial, sans-serif', // Set h1 font as Arial
      fontSize: '22px', // Set h1 font size to 24px
      fontWeight: 600
    },
    h5: {
      fontSize: '13px', // Set h1 font size to 24px
    },
    h6: {
      fontSize: '11px', // Set h1 font size to 24px
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff', // Set AppBar background to white
          color: '#343a40', // Set text color to dark gray
          boxShadow: 'none', // Remove shadow
          borderBottom: '1px solid #e0e0e0', // Add subtle bottom border
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          gap: 1,
          alignItems: 'baseline',
          '@media (min-width:600px)': {
            gap: 24,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 16,
            paddingBottom: 16,
            minHeight: 32,
          }
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Prevent uppercase text
          borderRadius: '4px', // Set border radius
          '&:hover': {
            backgroundColor: '#007bff', // Set hover color
            color: '#ffffff', // Set hover text color
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'rgb(102, 102, 102)', // Set the text color to gray
          textDecoration: 'none', // Remove underline by default
          '&:hover': {
            textDecoration: 'underline', // Add underline on hover
          },
        },
      },
    },
  },
});

export default theme;