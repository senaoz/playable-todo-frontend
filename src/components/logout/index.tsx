import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../auth/authProvider";
import { fetchApi } from "../../utils/api";

const Logout = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { setToken, setUser } = useContext(AuthContext);

  // Clear the token from local storage and context
  useEffect(() => {
    fetchApi("/api/logout", "POST", {}, `${localStorage.getItem("token")}`)
      .then((data) => {
        console.log(data);
      })
      .then((error) => {
        console.error(error);
      })
      .then(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        setLoading(false);
      });
  }, []);

  return (
    <div className={"centerized"}>
      <h1>Logged out!</h1>
      <p>See you soon!</p>
      <button
        className={"button primary"}
        onClick={() => (window.location.href = "/login")}
      >
        Login again
      </button>
    </div>
  );
};

export default Logout;
