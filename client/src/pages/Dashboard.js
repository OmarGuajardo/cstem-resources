import React from "react";
import Application from "../components/Application";
import "../styles/Opportunity.css";
import "../styles/Dashboard.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import { useCookies } from "react-cookie";

import { logoutUser } from "../actions/authActions";

function Dashboard(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);

  if (!props.auth.isAuthenticated) {
    return <Redirect to="/login" />;
  }
  const logOut = () => {
    removeCookie("authToken");
    props.logoutUser();
  };

  return (
    <div className="dashBoard">
      <div className="side-nav-bar-container">
        <div className="logo-container">
          <FaReact className="dashboard-icon" />
          <h3 className="dashboard-title">C-STEM</h3>
        </div>
        <div className="actions-container"></div>
        <div className="log-out-btn">
          <h4 onClick={logOut}>Log Out</h4>
        </div>
      </div>
      <Application />
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
