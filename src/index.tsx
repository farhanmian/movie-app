import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import MuiTheme from "./Theme";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={MuiTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
