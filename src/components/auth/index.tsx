import { AuthContext } from "./authProvider";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { token, setToken, loading } = useContext(AuthContext);
  return { token, setToken, loading };
};

export const useProtectedRoute = () => {
  const { token, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !token) {
      navigate("/login");
    }
  }, [loading, token, navigate]);
};

export const useLogout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return logout;
};
