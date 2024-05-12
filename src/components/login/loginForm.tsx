import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/authProvider";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../../utils/api";

const LoginForm = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const { setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fetchApi("/api/login", "POST", { email, password }).then(
      (data) => {
        if (data.success === false) {
          setErrorMessage(
            data.error || "Invalid email or password. Please try again.",
          );
          return;
        } else {
          let response = data.data as unknown as { token: string; user: any };
          setToken(response.token);
          setUser(response.user);
          localStorage.setItem("token", response.token);
          navigate("/");
        }
      },
      (error) => {
        console.error(error);
      },
    );
  };

  return (
    <>
      <h1>Sign in to your account</h1>
      <form onSubmit={handleSubmit} className={"form"}>
        <label htmlFor="email">Email address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type={"email"}
          required={true}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <div className="mb-4">{errorMessage}</div>}
        <button type="submit" className={"button primary"}>
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
