import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { connect } from "react-redux";
import { loginUser, loginWithToken } from "../actions/authActions";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FaReact } from "react-icons/fa";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["authToken"]);
  useEffect(() => {
    props.loginWithToken(cookies.authToken);
  }, []);

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

  if (props.auth.isAuthenticated) {
    console.log("user is authenticated, putting token in cookie");
    setCookie("authToken", props.auth.token, {
      path: "/",
    });
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="background">
      <FaReact className="login-icon" />
      <FaReact id="top-right" className="login-icon-background" />
      <FaReact id="bottom-left" className="login-icon-background" />
      <form onSubmit={loginUser} className="login-container" action="">
        <h1>Welcome</h1>
        <TextField
          error={props.error ? true : false}
          helperText={props.error ? `Incorrect Email` : ""}
          onChange={updateEmail}
          className="input-text-field"
          id="standard-basic"
          label="EMAIL"
        />
        <TextField
          error={props.error ? true : false}
          helperText={props.error ? `Incorrect Password` : ""}
          onChange={updatePassword}
          className="input-text-field"
          id="standard-basic"
          type="password"
          label="PASSWORD"
        />

        <div className="button-container">
          <Button type="submit" className="login-btn">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.auth.error,
});

// export default Login;
export default connect(mapStateToProps, { loginUser, loginWithToken })(Login);
