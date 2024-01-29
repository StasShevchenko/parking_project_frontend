import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ThemeProvider} from "@mui/material";
import {componentsTheme} from "./theme/componentsTheme.ts";
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import AuthPage from "./pages/auth_page/AuthPage.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<AuthPage/>}/>
            <Route path="*" element={<Navigate to="/"/>} />
        </Route>
    )
)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider theme={componentsTheme}>
          <RouterProvider router={router}/>
      </ThemeProvider>
  </React.StrictMode>,
)
