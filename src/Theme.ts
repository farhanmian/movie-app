import { createTheme } from "@mui/material/styles";

const MuiTheme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",

    h1: {
      fontSize: "5.3rem",
      lineHeight: "82px",
      letterSpacing: ".015em",
      fontWeight: 600,
    },

    h2: {
      fontSize: "4.2rem",
      fontWeight: "bold",
    },

    h3: {
      fontSize: "3.6rem",
      lineHeight: "42.19px",
    },
    h4: {
      fontSize: "3.5rem",
      lineHeight: "46.2px",
    },

    h5: {
      fontSize: "3.4rem",
      lineHeight: "34px",
      fontWeight: "bold",
    },
    h6: {
      fontSize: "2rem",
      lineHeight: "25.78px",
    },
    body1: {
      fontSize: "1.8rem",
      lineHeight: "21.6px",
      fontWeight: 700,
      fontFamily: "Roboto",
    },

    body2: {
      fontSize: "1.6rem",
      lineHeight: "28px",
    },
    subtitle1: {
      fontSize: "1.7rem",
      lineHeight: "24px",
    },
    subtitle2: {
      fontSize: "1.6rem",
      lineHeight: "20px",
      fontFamily: "Roboto",
    },
    caption: {
      fontSize: "1.4rem",
      lineHeight: "14px",
      fontWeight: 400,
      fontFamily: "Roboto",
    },
    overline: {
      fontSize: "1.2rem",
      lineHeight: "14.6px",
    },
  },
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#989898", // gray
      dark: "#F21E79",
      // dark: "#FF1B7D",
    },
    text: {
      primary: "#000",
      secondary: "#f1f1f1",
    },
  },
  components: {
    MuiPagination: {
      styleOverrides: {
        ul: {
          "> li > button, > li > div": {
            color: "#ccc",
            borderColor: "#ccc",
          },
        },
      },
    },
    MuiSkeleton: {
      defaultProps: {
        color: "red",
        style: { backgroundColor: "#333" },
      },
    },
  },
});

export default MuiTheme;
