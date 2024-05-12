import { AuthContext } from "./authProvider";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useProtectedRoute = () => {
  const { token, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [user, token, navigate, loading]);
};
