import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ThemeProvider} from "@mui/material";
import {componentsTheme} from "./theme/componentsTheme.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider theme={componentsTheme}>
          <App />
      </ThemeProvider>
  </React.StrictMode>,
)
