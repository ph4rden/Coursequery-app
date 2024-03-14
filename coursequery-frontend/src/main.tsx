import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Register from "./pages/Register.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Login from "./pages/Login.tsx";
import Schedule from "./components/Schedule.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    // children: [
    //   {
    //     path: "dashboard/:scheduleId",
    //     element: <Dashboard />, 
    //   }
    // ]
  },
  {
    // Work in progress
    path: "dashboard/:scheduleId",
    element: <Schedule />, 
  },
  {
    path: "/login",
    element: <Login />,
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
