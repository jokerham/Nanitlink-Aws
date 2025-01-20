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
    fontFamily: 'Tahoma, sans-serif',
    h1: {
      fontFamily: 'Arial, sans-serif',
      fontSize: '24px',
      fontWeight: 600
    },
    h2: {
      color: '#666',
      fontFamily: 'Arial, sans-serif',
      fontSize: '22px',
      fontWeight: 600
    },
    h4: {
      color: '#333',
      fontFamily: 'Arial, sans-serif',
      fontSize: '13px',
      fontWeight: 700
    },
    h5: {
      fontSize: '13px',
    },
    h6: {
      fontSize: '11px',
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
    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          '& .MuiInputBase-multiline': {
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          paddingTop: "2px",
          paddingBottom: "1px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          color: '#555',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px', 
          fontWeight: 400,
          height: 26,
          padding: "0px 16px 0px 16px",
        },
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          paddingTop: '2px',
          paddingBottom: '2px',
        },
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          maxHeight: '30px', // Set max height for the entire checkbox control
        },
        label: {
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px', // Set label font size
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          height: '30px', // Set the height of the checkbox itself
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          // Apply dense padding to all tables
          borderCollapse: 'collapse', // Optional: Better for dense tables
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          // Reduce row height
          '&.MuiTableRow-root': {
            height: 36, // Adjust to your preference
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          // Apply dense padding to table cells
          padding: '6px 16px', // Adjust padding as needed
          fontSize: '0.875rem', // Smaller font for a dense look
        },
      },
    },
  },
});

export default theme;