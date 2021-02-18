import React, { useEffect, useState } from "react";
import "../styles/Opportunity.css";
import Checkbox from "@material-ui/core/Checkbox";
import { UPDATE_OPPORTUNITY } from "../actions/types";

const Opportunity = (props) => {
  const handleClick = (e) => {
    props.openModal(UPDATE_OPPORTUNITY, props.opportunity);
    console.log("I need to update");
  };
  return (
    <div className="opportunity-container">
      <div id="delete-btn" className="opportunity-info">
        <Checkbox
          onChange={(e) => {
            props.handleOnChange(e, props.opportunity);
          }}
        ></Checkbox>
      </div>
      <div className="opportunity-info">
        <a href={props.opportunity.url}>{props.opportunity.name}</a>
      </div>
      <div onClick={handleClick} className="opportunity-info">
        {props.opportunity.participants}
      </div>
      <div onClick={handleClick} className="opportunity-info">
        {props.opportunity.major}
      </div>
      <div onClick={handleClick} className="opportunity-info">
        {props.opportunity.deadline}
      </div>
    </div>
  );
};

export default Opportunity;
