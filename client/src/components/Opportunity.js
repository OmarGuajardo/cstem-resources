import React from "react";
import "../styles/Opportunity.css";
import Checkbox from "@material-ui/core/Checkbox";

const Opportunity = (props) => {
  return (
    <div className="opportunity-container">
      <div id="delete-btn" className="opportunity-info">
        <Checkbox></Checkbox>
      </div>
      <div className="opportunity-info">{props.name}</div>
      <div className="opportunity-info">{props.participants}</div>
      <div className="opportunity-info">{props.major}</div>
      <div className="opportunity-info">{props.deadline}</div>
    </div>
  );
};

export default Opportunity;
