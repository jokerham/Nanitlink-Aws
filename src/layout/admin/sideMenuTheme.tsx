import { createTheme } from '@mui/material/styles';

const sideMenuTheme = createTheme({
  components: {
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
          '& .MuiListItemText-root': {
            marginLeft: '16px',
          },
          '& .MuiListItemText-primary': {
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
            backgroundImage: 'linear-gradient(to bottom, #f1f1f1, #e7e8e8)',
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
              '&.active': {
                fontWeight: 700,
              }
            },
            '&:hover': {
              backgroundImage: 'linear-gradient(to bottom, #ffffff, #f1f1f1)',
            },
            '& > .MuiListItemText-root.active .MuiTypography-root.MuiListItemText-primary': {
              fontWeight: 700,
            },
            '& .MuiTypography-root.MuiListItemText-primary': {
              fontSize: '0.8125rem',
              '&:hover': {
                fontWeight: 700,
              }
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

export default sideMenuTheme;