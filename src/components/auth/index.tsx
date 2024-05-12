import { AuthContext } from "./authProvider";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useProtectedRoute = () => {
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, token]);
};

export const useLogout = () => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return logout;
};
