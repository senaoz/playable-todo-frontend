import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.scss";
import LoginPage from "./components/login";
import Layout from "./components/layout";
import { AuthProvider } from "./components/auth/authProvider";
import { Navigate } from "react-router-dom";
import Logout from "./components/logout";
import ProtectedToDos from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <ProtectedToDos /> },
      { path: "/login", element: <LoginPage /> },
      {
        path: "/logout",
        element: <Logout />,
      },
      { path: "*", element: <Navigate to="/" /> },
    ],
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
