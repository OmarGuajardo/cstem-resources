import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchOpportunities } from "../actions/opportunitiesActions";
import Opportunity from "../components/Opportunity";
import Checkbox from "@material-ui/core/Checkbox";
import "../styles/Application.css";
function Application(props) {
  useEffect(() => {
    props.fetchOpportunities();
  }, []);
  return (
    <div className="app-container">
      <div className="app-title">
        <h1>External Resources Database</h1>
      </div>
      <div className="application-content">
        <div id="table-header" className="opportunity-container">
          <div id="delete-btn" className="opportunity-info">
            <Checkbox></Checkbox>
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

export default connect(mapStateToProps, { fetchOpportunities })(Application);
