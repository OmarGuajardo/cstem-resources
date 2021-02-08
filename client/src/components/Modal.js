import React, { useState } from "react";
import "../styles/Modal.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import { FaRegSave } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { connect } from "react-redux";
import { createOpportunity } from "../actions/opportunitiesActions";

const fullWidth = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));
const quarterWidth = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "23%",
    },
  },
}));

function Modal(props) {
  const [c, setC] = useState("EPM");
  const [program, setProgram] = useState({ classification: "EPM" });

  const classifications = [
    {
      label: "External Program by Major",
      value: "EPM",
    },
    {
      label: "External Programs for STEM",
      value: "EPSTEM",
    },
    {
      label: "Research Experience for Undergraduates",
      value: "REU",
    },
    {
      label: "Internships at National Labs",
      value: "INL",
    },
    {
      label: "Company Internships",
      value: "CI",
    },
  ];
  const handleChange = (e) => {
    setC(e.target.value);
    setProgram({ ...program, classification: e.target.value });
  };
  const updateProgram = (e) => {
    setProgram({ ...program, [e.target.name]: e.target.value });
  };

  const saveProgram = () => {
    props.createOpportunity(program);
  };
  const full = fullWidth();
  const quarter = quarterWidth();
  return (
    <div className={props.show ? "background-blur" : "background-blur hidden"}>
      <div className="form-container">
        <div className="form-heading">
          <h2>New Program</h2>
          <ImCross onClick={props.closeFunc} id="exitForm" />
        </div>
        <div className="form-content">
          <form className={full.root} noValidate autoComplete="off">
            <TextField
              onChange={updateProgram}
              id="standard-basic"
              label="Name"
              name="name"
            />
            <TextField
              onChange={updateProgram}
              id="standard-basic"
              label="URL"
              name="url"
            />
          </form>
          <form className={quarter.root} noValidate autoComplete="off">
            <TextField
              onChange={updateProgram}
              id="standard-basic"
              label="Major"
              name="major"
            />
            <TextField
              onChange={updateProgram}
              id="standard-basic"
              label="Participants"
              name="participants"
            />
            <TextField
              onChange={updateProgram}
              id="standard-basic"
              label="Deadline"
              name="deadline"
            />
            <TextField
              onChange={updateProgram}
              id="standard-select-currency"
              select
              label="Select"
              value={c}
              onChange={handleChange}
              helperText="Please select the classification"
            >
              {classifications.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </form>
        </div>
        <Fab onClick={saveProgram} id="fabForm">
          <FaRegSave id="save-icon-fab" />
        </Fab>
      </div>
    </div>
  );
}

export default connect(null, { createOpportunity })(Modal);
