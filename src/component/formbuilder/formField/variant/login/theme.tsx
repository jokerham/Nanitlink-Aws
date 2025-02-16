import { createTheme } from '@mui/material/styles';

// Custom MUI theme
const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            top: -8,
            fontSize: '14px',
          },
          '& .MuiInputLabel-shrink': {
            top: 0,
          },
          '& label.Mui-focused': {
            color: '#D9534F;', // Label color when focused
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#D9534F;', // Border color after underline when focused
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'grey', // Default border color
            },
            '&:hover fieldset': {
              borderColor: '#D9534F;', // Border color when hovered
            },
            '&.Mui-focused fieldset': {
              borderColor: '#D9534F;', // Border color when focused
            },
          },
          '& .MuiOutlinedInput-input': {
            paddingTop: '6px',
            paddingBottom: '6px',
          }
        }
      }
    },
  }
});

export default theme;