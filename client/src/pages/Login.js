import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import { TokenExpiredError } from "jsonwebtoken";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      email: email,
      password: password,
    });
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post("/api/auth/login", body, config);
      const userData = res.data;
      const userToken = res.headers["auth-token"];
    } catch (err) {
      console.log(err);
    }
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
