import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter

import store from "./store";
import App from "./App";

const theme = createTheme();
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

ReactDOM.render(
  <Router>
    {/* Wrap the entire application with BrowserRouter */}
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </Provider>
    </ThemeProvider>
  </Router>,
  document.getElementById("root")
);
