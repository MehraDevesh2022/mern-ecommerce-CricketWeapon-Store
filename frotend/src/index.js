import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store';
import App from './App';
import { Provider } from "react-redux";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
 import { createTheme, ThemeProvider } from "@mui/material/styles";
const root = ReactDOM.createRoot(document.getElementById('root'));
 // these parameter are from  react alert

 const theme = createTheme();
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
}; 
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  </ThemeProvider>
);
