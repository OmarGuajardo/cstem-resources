import React, { useState } from "react";
import "../styles/Modal.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import { FaRegSave } from "react-icons/fa";
import { ImCross } from "react-icons/im";
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
  const classifications = [
    {
      value: "External Program by Major",
      label: "EPM",
    },
    {
      value: "External Programs for STEM",
      label: "EPSTEM",
    },
    {
      value: "Research Experience for Undergraduates",
      label: "REU",
    },
    {
      value: "Internships at National Labs",
      label: "INL",
    },
    {
      value: "Company Internships",
      label: "CI",
    },
  ];
  const [classification, setClassification] = useState("EPM");
  const handleChange = (e) => {
    setClassification(e.target.value);
  };
  const full = fullWidth();
  const quarter = quarterWidth();
  return (
    <div className={props.show ? "background-blur" : "background-blur hidden"}>
      <div className="form-container">
        <div className="form-heading">
          <h2>New Program</h2>
          <ImCross id="exitForm" />
        </div>
        <div className="form-content">
          <form className={full.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Name" name="name" />
            <TextField id="standard-basic" label="URL" name="url" />
          </form>
          <form className={quarter.root} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Major" name="major" />
            <TextField
              id="standard-basic"
              label="Participants"
              name="participants"
            />
            <TextField id="standard-basic" label="Deadline" name="deadline" />
            <TextField
              id="standard-select-currency"
              select
              label="Select"
              value={classification}
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
        <Fab id="fabForm">
          <FaRegSave id="save-icon-fab" />
        </Fab>
      </div>
    </div>
  );
}

export default Modal;
