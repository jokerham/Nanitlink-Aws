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
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(to bottom, #f1f1f1, #e7e8e8)',
          borderBottom: '1px solid #e0e0e0',
          boxShadow: 'none',
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            backgroundImage: 'linear-gradient(to bottom, #6dbbea, #3886d0)',
            color: '#ffffff',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          },
          '&.active': {
            backgroundImage: 'linear-gradient(to bottom, #000000, #000000)',
            color: '#ffffff',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          cursor: 'pointer', // Hand cursor
          minHeight: 36,
          paddingLeft: 16,
          paddingRight: 16,
          '&.Mui-expanded': {
            minHeight: 36,
          },
          '& .MuiAccordionSummary-content': {
            margin: 0,
            '&.Mui-expanded': {
              margin: 0,
            },
          },
          '& .MuiTypography-root.MuiListItemText-primary': {
            fontSize: '0.8125rem', // 13px
          },
        },
        expandIconWrapper: {
          color: '#333333',
          '&.Mui-expanded': {
            color: '#ffffff',
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          paddingLeft: 12,
          paddingRight: 12,
          paddingTop: 0,
          paddingBottom: 0,
          backgroundColor: 'rgba(0,0,0,0)',
          '& > .MuiList-root': {
            cursor: 'pointer', // Hand cursor
            paddingTop: 0,
            marginBottom: 4,
          },
          '& > .MuiList-root > .MuiListItem-root': {
            color: '#333333',
            backgroundImage: 'linear-gradient(to bottom, #f1f1f1, #e7e8e8)', // #f9f9f9 , #ffffff
            borderBottom: '1px solid #e0e0e0',
            minHeight: 36,
            paddingTop: 0,
            paddingBottom: 0,
            '&:first-of-type': {
              borderRadius: '5px 5px 0 0',
            },
            '&:last-of-type': {
              borderRadius: '0 0 5px 5px',
              borderBottom: '0px',
            },
            '& > .MuiListItemText-root': {
              paddingLeft: '16px',
            },
            '& .MuiTypography-root.MuiListItemText-primary': {
              fontSize: '0.8125rem', // 13px
            },
          }
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          marginTop: 'auto',
          marginBottom: 'auto',
          minWidth: 0,
          color: 'inherit'
        }
      }
    }
  },
});

export default theme;