import React, { useEffect } from "react";
import Opportunity from "../components/Opportunity";
import "../styles/Opportunity.css";
import "../styles/Dashboard.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import { useCookies } from "react-cookie";

import { fetchOpportunities } from "../actions/opportunitiesActions";
import { logoutUser } from "../actions/authActions";

function Dashboard(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);

  useEffect(() => {
    props.fetchOpportunities();
  }, []);

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
      <div className="app-container">
        <div className="app-title">
          <h1>External Resources Database</h1>
        </div>
        <div className="opportunity-container">
          <div id="delete-btn" className="opportunity-info">
            <button>x</button>
          </div>
          <div className="opportunity-info">Program</div>
          <div className="opportunity-info">Major</div>
          <div className="opportunity-info">Participants</div>
          <div className="opportunity-info">Deadline</div>
        </div>
        {props.opportunities.map((opportunity) => (
          <Opportunity
            name={opportunity.name}
            classification={opportunity.classification}
            url={opportunity.url}
            major={opportunity.major}
            participants={opportunity.participants}
            deadline={opportunity.deadline}
            key={opportunity._id}
          />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  opportunities: state.opportunities.items,
});

export default connect(mapStateToProps, { fetchOpportunities, logoutUser })(
  Dashboard
);
