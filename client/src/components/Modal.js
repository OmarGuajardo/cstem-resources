import React, { useState } from "react";
import "../styles/Modal.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import ErForm from "../components/ErForm";
import { FaRegSave } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { connect } from "react-redux";
import { createOpportunity } from "../actions/opportunitiesActions";

function Modal(props) {
  return (
    <div className={props.show ? "background-blur" : "background-blur hidden"}>
      <ErForm width="60%" height="65%" closeFunc={props.closeFunc} />
    </div>
  );
}

export default connect(null, { createOpportunity })(Modal);
