import React, { Fragment } from 'react';
import { Box, CircularProgress, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  components: {
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          width: "100px !important",
          height: "100px !important",
        },
      },
    },
  },
});

interface ILoadingProps {
  loading: boolean
  children?: React.ReactNode
}

const Loading = ({loading, children}: ILoadingProps) => {
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%">
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  } else {
    return <Fragment>{children}</Fragment>;
  }
}

export default Loading;
