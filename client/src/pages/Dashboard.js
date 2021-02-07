import React, { useEffect } from "react";
import Opportunity from "../components/Opportunity";
import "../styles/Opportunity.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { fetchOpportunities } from "../actions/opportunitiesActions";

function Dashboard(props) {
  useEffect(() => {
    props.fetchOpportunities();
  }, []);

  if (!props.auth.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="dashBoard">
      <div className="opportunity-container">
        <div id="delete-btn" className="opportunity-info"></div>
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
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  opportunities: state.opportunities.items,
});

export default connect(mapStateToProps, { fetchOpportunities })(Dashboard);
