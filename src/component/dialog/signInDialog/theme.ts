import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          width: 320,
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #e0e0e0',
          marginBottom: '8px',
          paddingBottom: '8px',
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #e0e0e0',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#D9534F',
          fontSize: '14px',
          '&:hover': {
            backgroundColor: '#C9302C'
          }
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          margin: '6px 16px',
        }
      }
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          '& .MuiButtonGroup-grouped': {
            borderColor: 'rgb(204,204,204)',
          },
          '& .MuiButton-root': {
            color: '#333',
            backgroundColor: '#FFF',
            
            fontSize: '11px',
            padding: '5px 0 5px 0',
            '&:hover': {
              backgroundColor: '#E6E6E6'
            },
            '& .MuiButton-icon': {
              marginRight: '4px',
              '& > svg': {
                height: '11px',
                width: '11px',
              }
            }
          },
        },
      }
    }
  },
});

export default theme;