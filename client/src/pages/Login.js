import React, { useState } from "react";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const loginUser = (e) => {
    e.preventDefault();
    console.log("this is the email: " + email);
    console.log("this is the password: " + password);
  };
  return (
    <div className="background">
      <h1>Log In</h1>
      <form onSubmit={loginUser} className="login-container" action="">
        <input onChange={updateEmail} placeholder="EMAIL" type="text" />
        <input
          onChange={updatePassword}
          placeholder="PASSWORD "
          type="password"
        />
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
