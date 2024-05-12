import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  token: null,
  setToken: () => {},
  loading: true,
} as any);

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    password?: string;
  } | null>();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const updateUserInfo = (newToken: string, newUser: any) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const clearUserInfo = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(undefined);
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: updateUserInfo,
        loading,
        user,
        setUser,
        clearUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
