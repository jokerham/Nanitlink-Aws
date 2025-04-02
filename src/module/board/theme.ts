import { fontSize } from './../../../node_modules/@mui/system/typography/typography.d';
import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableRow-root': {
            borderTop: '1px solid #DBDBDB',
            borderBottom: '3px double #DBDBDB',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '0.75rem',
          color: '#4a4a4a',
        },
        head: {
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.MuiTableCell-head': {
            '&.no': { width: '3%' },
            '&.subject': { width: '67%' },
            '&.author': { width: '10%' },
            '&.date': { width: '10%' },
            '&.views': { width: '7%' },
            '&.checkbox': { width: '3%' },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#ECECEC',
          color: '#000',
          padding: 0,
          borderRadius: '2px',
          paddingLeft: '12px',
          paddingRight: '12px',
          textTransform: 'none',
          height: '22px',
          '&:hover': {
            backgroundColor: '#CDA25A',
            color: '#23527c',
            '& .MuiSvgIcon-root': {
              color: '#23527c',
            },
          },
          '& .MuiButton-startIcon': {
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
            borderRadius: '2px',
            width: '10px',
            height: '10px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '-12px',
            padding: '6px',
            color: 'inherit',
          },
        },
      },
    },
  },
});

export default theme;