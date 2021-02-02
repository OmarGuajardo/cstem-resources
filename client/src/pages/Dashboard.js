import React, { useState, useContext, useReducer } from "react";
import Opportunity from "../components/Opportunity";
import "../styles/Opportunity.css";
import { OpportunitiesContext } from "../providers/OpportunitiesContext";

function Dashboard() {
  const [opportunities, setOpportunities] = useContext(OpportunitiesContext);
  return (
    <div className="dashBoard">
      <div className="opportunity-container">
        <div id="delete-btn" className="opportunity-info"></div>
        <div className="opportunity-info">Program</div>
        <div className="opportunity-info">Major</div>
        <div className="opportunity-info">Participants</div>
        <div className="opportunity-info">Deadline</div>
      </div>
      {opportunities.map((opportunity) => (
        <Opportunity
          name={opportunity.name}
          classification={opportunity.classification}
          url={opportunity.url}
          major={opportunity.major}
          participants={opportunity.participants}
          deadline={opportunity.deadline}
          key={opportunity.id}
        />
      ))}
    </div>
  );
}

export default Dashboard;
