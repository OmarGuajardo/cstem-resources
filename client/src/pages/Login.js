import React, { useState } from "react";
import "../styles/Login.css";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import { Redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginUser = (e) => {
    e.preventDefault();
    props.loginUser({ email, password });
  };

  const auth = true;
  if (props.auth) {
    return <Redirect to="/dashboard" />;
  }

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

const mapStateToProps = (state) => ({
  auth: state.auth.isAuthenticated,
});

// export default Login;
export default connect(mapStateToProps, { loginUser })(Login);
