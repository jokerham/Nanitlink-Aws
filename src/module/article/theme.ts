import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          backgroundColor: "#444",
          borderRadius: "6px",
          padding: "0px",
          display: "flex",
          justifyContent: "center",
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fff",
          textTransform: "none",
          fontSize: "14px",
          backgroundColor: "#444",
          borderRadius: "0px",
          boxShadow: "none",
          minWidth: "auto",
          padding: "6px 12px",
          margin: "0px",
          border: "none",
          "&:hover": {
            backgroundColor: "#555",
          },
          "&:first-of-type": {
            borderTopLeftRadius: "4px",
            borderBottomLeftRadius: "4px",
          },
          "&:last-of-type": {
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "4px",
          },
          "&:not(:last-child)": {
            borderRight: "none",
          },
        },
      },
    },
  },
});

export default theme;