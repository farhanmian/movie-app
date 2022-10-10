import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import MuiTheme from "./Theme";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AppWrapper } from "./store/context/context";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={MuiTheme}>
      <BrowserRouter>
        <AppWrapper>
          <App />
        </AppWrapper>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
