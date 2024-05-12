import { AuthContext } from "./authProvider";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useProtectedRoute = () => {
  const { token, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    const localToken = localStorage.getItem("token");

    if (!user || !token) {
      if (localUser && localToken) {
        return;
      } else {
        navigate("/login");
      }
    } else if (!loading && user && token) {
      if (window.location.pathname === "/login") navigate("/");
    }
  }, [user, token, navigate, loading]);
};
