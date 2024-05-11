import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.scss";
import LoginPage from "./components/login";
import Layout from "./components/layout";
import App from "./App";

function ProtectedPage() {
  return <h3>Protected</h3>;
}

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: App,
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "protected",
        Component: ProtectedPage,
      },
    ],
  },
  {
    path: "/logout",
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />,
);
