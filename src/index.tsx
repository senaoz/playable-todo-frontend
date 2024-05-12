import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.scss";
import LoginPage from "./components/login";
import Layout from "./components/layout";
import App from "./App";
import { AuthProvider } from "./components/auth/authProvider";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
  {
    path: "/logout",
    element: <Navigate to="/login" />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <AuthProvider>
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  </AuthProvider>,
);
