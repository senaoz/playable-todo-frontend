import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/authProvider";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../../utils/api";

const SignUpForm = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fetchApi("/api/users", "POST", {
      email,
      password,
      firstName,
      lastName,
    }).then(
      (data) => {
        if (data.success === false) {
          setErrorMessage(
            "User already exists or invalid data. Please try again.",
          );
          return;
        } else {
          let response = data as unknown as { token: string };
          setToken(response.token);
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
      <h1>Create account!</h1>
      <form onSubmit={handleSubmit} className={"form"}>
        <label htmlFor="name">Name</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            id="firstName"
            placeholder={"First name"}
            required={true}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            id="lastName"
            placeholder={"Last name"}
            required={true}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <label htmlFor="email">Email address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type={"email"}
          placeholder={"example@playablefactory.com"}
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
          Sign up
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
