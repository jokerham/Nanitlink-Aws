import { styled } from '@mui/material/styles';
import { Button, ButtonProps, createTheme, Link, ListItemButton, ListItemText, ListItemTextProps, TextField, TextFieldProps, Typography } from '@mui/material';
import { ColumnBox, RowBox } from 'component/customMui';
import { IoCloseSharp } from 'react-icons/io5';
import { ThemeProvider } from '@emotion/react';

export const MenuTab = styled(ColumnBox)(({ theme }) => ({
  alignItems: 'stretch',
  gap: '5px',
  backgroundImage: '-webkit-linear-gradient(top, #eee, #ddd 18px, #ccc 18px, #ddd 33px)',
  backgroundColor: '#ddd',
  borderRadius: '5px',
  boxShadow: '1px 1px 1px #999',
  height: '100%',
  overflow: 'hidden',
  verticalAlign: 'top',
  position: 'relative',
  padding: '10px 10px 5px 10px',
}));

export const MenuTabHeader = styled(RowBox)({
  alignItems: 'center',
  alignContent: 'space-between',
});

export const MenuTabTitle = styled(Typography)({
  fontSize: '16px',
  margin: '-10px -10px 0 -10px',
  lineHeight: '32px !important',
  color: '#000',
  padding: '0 8px',
  textOverflow: 'ellipsis',
  verticalAlign: 'middle',
  '& svg': {
    marginLeft: '5px',
    top: '2px',
    position: 'relative',
    opacity: 0.5,
    '&:hover': {
      opacity: 1,
    },
  },
})

export const MenuTabContent = styled(ColumnBox)({
  flexGrow: 1,
  gap: '5px',
  backgroundColor: '#fff',
  border: '1px solid #999',
  borderRadius: '5px',
  padding: '5px 10px',
});

export const MenuTabAction = styled(RowBox)({
  alignItems: 'center',
  justifyContent: 'end',
});

export const MenuTabClose = styled(Link)({
  marginLeft: 'auto',
  cursor: 'pointer',
})

interface ICloseIconProps {
  onClick: () => void
}

export const CloseIcon = ({onClick}: ICloseIconProps ) => {
  return (
    <MenuTabClose onClick={onClick}>
      <IoCloseSharp />
    </MenuTabClose>
  )
}

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          flexGrow: 1,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFF',
          color: '#555',
          fontSize: '14px', 
          fontWeight: 400,
          height: 26,
          padding: 0,
        },
      }
    },
  },
});

export const SearchTextField = (props: TextFieldProps) => {
  return (
    <ThemeProvider theme={theme}>
      <TextField {...props}/>
    </ThemeProvider>
  );
}

export const SmallButton = styled(Button)({
  height: '25px'
})

export const ContainedButton = (props: ButtonProps) => {
  return (
    <SmallButton variant="contained" size="small" {...props}/>
  )
}

export const TreeNodeRowBox = styled(RowBox)({
  alignItems: 'center',
  borderRadius: '5px',
  margin: '4px 0',
  padding: '4px 5px 3px 5px',
  transition: 'background-color 0.5s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#444',
    '& .MuiTypography-root': {
      color: '#fff',
    },
  },
  '&.active': {
    backgroundColor: 'black',
    '& .MuiTypography-root': {
      color: '#fff',
    },
  },
})

export const BaseTypography = styled(Typography)({
  fontSize: '13px',
  fontFamily: 'Arial',
})

export const ActionButton = styled(Button)({
  gap: '5px',
  margin: 0,
  padding: 0,
  color: '#000',
  '& svg': {
    opacity: 0.5,
  },
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#000',
    '& svg': {
      opacity: 1,
    },
  },
})

export const ContainedGrayButton = (props: ButtonProps) => (
  <ContainedButton
    {...props}
    sx={{
      color: '#333',
      backgroundColor: '#f5f5f5',
      '&:hover': {
        color: '#333',
        backgroundColor: '#e6e6e6',
      },
    }}
  />
);
export const ActionTypography = BaseTypography;
export const TreeNodeLabel = styled(BaseTypography)({
  display: 'flex',      // ✅ Enable flexbox
  alignItems: 'center', // ✅ Align items (icon & text) vertically center
  gap: '5px',           // ✅ Add spacing between icon and text
});

export const SettingButton = styled(ListItemButton)({
  padding: '2px 10px',
  '& svg': {
    opacity: 0.5,
    height: '14px',
    width: '13px',
    color: '#000',
  },
})

export const SettingText = (props: ListItemTextProps) => {
  return (
    <ListItemText {...props} slotProps={{
      primary: {
        fontSize: 13,
        fontWeight: 'Arial',
        letterSpacing: 0,
      }
    }}/>
  )
}
