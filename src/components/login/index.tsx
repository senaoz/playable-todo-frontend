import React, { useState, useContext } from "react";
import LoginForm from "./loginForm";
import SignUpForm from "./signUpForm";

const Login = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className={"centerized"}>
      {isLogin ? (
        <>
          <LoginForm />
          <p>
            Not a member? Sign up{" "}
            <a href={"#"} onClick={() => setIsLogin(false)}>
              {" "}
              here!
            </a>
          </p>
        </>
      ) : (
        <>
          <SignUpForm />
          <p>
            Already a member? Login{" "}
            <a href={"#create"} onClick={() => setIsLogin(true)}>
              here!
            </a>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
