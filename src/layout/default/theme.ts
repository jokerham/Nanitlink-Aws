import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#222222", // Dark gray (Header, navbar, footer)
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#D32F2F", // Dark red (for active states, menu highlights)
    },
    background: {
      default: "#F5F5F5", // Soft light gray (main background)
      paper: "#FFFFFF", // White (content areas)
    },
    text: {
      primary: "#1B1E1E", // Dark gray (main text)
      secondary: "#4F4F4F", // Medium gray (subtext)
    },
  },
  typography: {
    fontFamily: "'Noto Sans KR', Tahoma",
    h1: {
      fontSize: "1.5rem",
      fontFamily: 'Arial, sans-serif',
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.375rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.125rem",
      fontWeight: 400,
    },
    h4: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiCssBaseline: { // Ensures that even non-MUI elements follow the font
      styleOverrides: {
        body: {
          fontFamily: "'Noto Sans KR', Tahoma, sans-serif",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 4,
          fontWeight: 400,
          padding: "4px 12px",
          transition: "all 0.3s",
          "&:hover": {
            opacity: 0.9,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#222222",
          borderRadius: 0,
          borderBottom: "2px solid #D9534F",
          "& .MuiContainer-root": {
            paddingLeft: 10,
            paddingRight: 10,
          }
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          "@media (min-width:600px)": {
            minHeight: 50,
            padding: 0,
          },
          "& .MuiButton-root": {
            color: "inherit", // Inherit color from AppBar
            textTransform: "none",
            textDecoration: "none", // Remove underline
            borderRadius: 0, // Ensure consistency
            height: 50,
            display: "flex", // Ensure text is vertically aligned
            alignItems: "center",
            "& .MuiTypography-root": {
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            },
          },
          "& .MuiButton-root.active": {
            backgroundColor: "#D9534F",
          },
        }
      },
    }
  },
});

export default theme;