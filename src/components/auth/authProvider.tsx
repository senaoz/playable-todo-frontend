import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  token: null,
  setToken: () => {},
  loading: true,
} as any);

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, loading, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
