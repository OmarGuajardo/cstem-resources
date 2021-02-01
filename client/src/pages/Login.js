import React from "react";
import "../styles/Login.css";

function Login() {
  return (
    <div className="background">
      <div className="login-container">
        <input placeholder="EMAIL" type="text" />
        <input placeholder="PASSWORD " type="password" />
        <button className="login-btn">Login</button>
      </div>
    </div>
  );
}

export default Login;
