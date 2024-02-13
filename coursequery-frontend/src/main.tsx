import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Dashboard from './pages/Dashboard.tsx';
import Register from './pages/Register.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import Login from './pages/Login.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const googleID="394187105839-jk8v5ign2io6o465ultcq5htbm0nisju.apps.googleusercontent.com"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)