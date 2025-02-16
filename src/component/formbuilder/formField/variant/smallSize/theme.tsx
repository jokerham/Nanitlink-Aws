import { createTheme } from '@mui/material/styles';

// Custom MUI theme
const theme = createTheme({
  components: {
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
          '& .MuiInputLabel-root': {
            top: -12,
            fontSize: '14px',
            paddingLeft: 0,
            paddingRight: 0,
          },
          '& .MuiInputLabel-shrink': {
            top: 0,
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
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            top: -12,
            fontSize: '14px',
            paddingLeft: 0,
            paddingRight: 0,
          },
          '& .MuiInputLabel-shrink': {
            top: 0,
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          maxHeight: '30px', // Set max height for the entire checkbox control
        },
        label: {
          fontFamily: 'Arial, sans-serif',
          fontSize: '13px', // Set label font size
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
  }
});

export default theme;