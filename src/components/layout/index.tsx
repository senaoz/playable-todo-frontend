import { Outlet } from "react-router-dom";
import { Navigation } from "./navigation";
import { useContext } from "react";
import { AuthContext } from "../auth/authProvider";

function Layout() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Navigation />
      <div className="pt-10">
        <div>
          {user && (
            <div>
              <h1>Welcome, {user.firstName}!</h1>
              <p>You are now logged in.</p>
            </div>
          )}
        </div>
        <Outlet />
      </div>
      <footer className="flex justify-between items-center">
        <p>Created by: Sena Oz</p>
        <p>© 2024 Todo App</p>
      </footer>
    </>
  );
}

export default Layout;
