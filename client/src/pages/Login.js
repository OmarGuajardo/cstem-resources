import React, { useState } from "react";
import "../styles/Login.css";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

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
  auth: state.auth,
});

// export default Login;
export default connect(mapStateToProps, { loginUser })(Login);
