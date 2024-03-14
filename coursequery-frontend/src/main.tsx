import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Register from "./pages/Register.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Login from "./pages/Login.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ProfilePage from "./pages/Profile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />, // Set LandingPage as the initial page
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/landingpage",
    element: <LandingPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
