import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Dashboard from './pages/Dashboard.tsx';
import RegistrationLoginPage from './pages/RegistrationLoginPage.tsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/register-login",
    element: <RegistrationLoginPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
