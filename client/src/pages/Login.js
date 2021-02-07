import React, { useState } from "react";
import "../styles/Login.css";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FaReact } from "react-icons/fa";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["authToken"]);

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
    //This shoudl be handled by reducer
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
        {/* <h2>asdf</h2> */}
        <TextField
          onChange={updateEmail}
          className="input-text-field"
          id="standard-basic"
          label="EMAIL"
        />
        <TextField
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
});

// export default Login;
export default connect(mapStateToProps, { loginUser })(Login);
