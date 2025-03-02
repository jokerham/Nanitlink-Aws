import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiPopover: {
      styleOverrides: {
        root: { 
          '& .MuiPaper-root': {
            borderRadius: '0px',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            backgroundColor: '#222',
            color: '#fff',
            width: 150,
            paddingTop: 5,
            paddingBottom: 5,
          }
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: '0px',
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#fff',
          minWidth: '24px !important',
          maxWidth: '24px !important',
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
          '&:hover': {
            backgroundColor: '#D32F2F',
          }
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          '& .MuiTypography-root': {
            fontFamily: "'Noto Sans KR', Tahoma",
            fontSize: '0.875rem',
          }
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: '#666',
          marginTop: '10px',
          marginBottom: '10px',
        }
      }
    }
  }
})

export default theme;