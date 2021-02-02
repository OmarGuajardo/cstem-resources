import React from "react";
import "../styles/Opportunity.css";

const Opportunity = (props) => {
  return (
    <div className="opportunity-container">
      <div id="delete-btn" className="opportunity-info">
        <button>x</button>
      </div>
      <div className="opportunity-info">{props.name}</div>
      <div className="opportunity-info">{props.participants}</div>
      <div className="opportunity-info">{props.major}</div>
      <div className="opportunity-info">{props.deadline}</div>
    </div>
  );
};

export default Opportunity;
