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

//TODO: Put this in a seperate file
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

function ErForm(props) {
  const [c, setC] = useState("EPM");
  const [program, setProgram] = useState({
    name: "",
    url: "",
    major: "",
    participants: "",
    deadline: "",
    classification: "EPM",
  });
  const [attributes, setAttributes] = useState({
    name: null,
    url: null,
    major: null,
    participants: null,
    deadline: null,
  });

  const handleChange = (e) => {
    setC(e.target.value);
    setProgram({ ...program, classification: e.target.value });
  };
  const updateProgram = (e) => {
    setProgram({ ...program, [e.target.name]: e.target.value });
    setAttributes({ ...attributes, [e.target.name]: false });
  };

  const saveProgram = () => {
    let allowToSave = true;
    const copyAttr = { ...attributes };

    Object.keys(program).map((key, index) => {
      if (program[key].trim() === "") {
        copyAttr[key] = true;
      }
    });
    setAttributes({ ...copyAttr });
    if (allowToSave) {
      props.createOpportunity(program);
    }
  };
  return (
    <div
      style={{ width: props.width, height: props.height }}
      className="form-container"
    >
      <div className="form-heading">
        <h2>New Program</h2>
        <ImCross onClick={props.closeFunc} id="exitForm" />
      </div>
      <div className="form-content">
        <form className={fullWidth().root} noValidate autoComplete="off">
          {Object.keys(attributes).map((key, index) => {
            if (index < 2) {
              return (
                <TextField
                  required={attributes[key]}
                  key={key}
                  onChange={updateProgram}
                  id="standard-basic"
                  error={attributes[key]}
                  label={key.toUpperCase()}
                  name={key}
                  helperText={attributes[key] ? `Required` : ""}
                />
              );
            }
          })}
        </form>
        <form className={quarterWidth().root} noValidate autoComplete="off">
          {Object.keys(attributes).map((key, index) => {
            if (index > 1) {
              return (
                <TextField
                  required={attributes[key]}
                  key={key}
                  onChange={updateProgram}
                  id="standard-basic"
                  error={attributes[key]}
                  helperText={attributes[key] ? `Required` : ""}
                  label={key.toUpperCase()}
                  name={key}
                />
              );
            }
          })}
          <TextField
            onChange={updateProgram}
            id="standard-basic"
            select
            label="CLASSIFICATION"
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
  );
}

export default connect(null, { createOpportunity })(ErForm);
