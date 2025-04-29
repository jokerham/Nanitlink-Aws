import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          borderTop: '2px solid #ddd',
          borderBottom: '1px solid #ddd',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          height: '38px',
          '&:nth-of-type(odd)': {
            backgroundColor: '#f5f5f5',
            '&.Mui-selected': {
              backgroundColor: 'rgba(25, 118, 210, 0.08)'
            },
          },

        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableRow-root .MuiTableCell-root': {
            backgroundColor: '#FFFFFF',
            fontWeight: 700,
          }
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '13px',
          padding: '6px'
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          fontSize: '13px',
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableRow-root .MuiTableCell-root': {
            fontSize: '13px',
            padding: '6px'
          }
        },
      },
    },
  }
})

export default theme;