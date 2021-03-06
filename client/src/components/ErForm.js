import React, { useState, useEffect } from "react";
import "../styles/Modal.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import { FaRegSave } from "react-icons/fa";
import { connect } from "react-redux";
import {
  createOpportunity,
  updateOpportunity,
} from "../actions/opportunitiesActions";
import Snackbar from "@material-ui/core/Snackbar";

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
  useEffect(() => {
    console.log("set snackbar");
    const { CREATE_OPPORTUNITY, UPDATE_OPPORTUNITY } = props.loading;
    //error
    if (CREATE_OPPORTUNITY || UPDATE_OPPORTUNITY) {
      setOpen(true);
      setSnackBarMessage("Saving changes...");
    }
    //loading
    else if (props.error) {
      setOpen(true);
      setSnackBarMessage(props.message);
    }
    //success
    else if ((!CREATE_OPPORTUNITY || !UPDATE_OPPORTUNITY) && !props.error) {
      setOpen(true);

      setSnackBarMessage("Opportunity saved!");
    }
  }, [props.error, props.loading]);

  useEffect(() => {
    console.log("default values");
    setDefaultValues(props.opportunity);
    setOpen(false);
  }, [props.opportunity]);

  const [open, setOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const [program, setProgram] = useState({
    name: "",
    url: "",
    major: "",
    participants: "",
    deadline: "",
    classification: "",
  });
  const [c, setC] = useState("INL");
  const [attributes, setAttributes] = useState({
    name: null,
    url: null,
    major: null,
    participants: null,
    deadline: null,
  });

  const setDefaultValues = (opp) => {
    setProgram({
      name: opp ? opp.name : "",
      url: opp ? opp.url : "",
      major: opp ? opp.major : "",
      participants: opp ? opp.participants : "",
      deadline: opp ? opp.deadline : "",
      classification: opp ? opp.classification : "INL",
    });
  };
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
        allowToSave = false;
      }
    });
    setAttributes({ ...copyAttr });
    if (allowToSave) {
      switch (props.type) {
        case "POST":
          props.createOpportunity(program);
          break;
        case "PUT":
          props.updateOpportunity(program, props.opportunity._id);
          break;
        default:
          return;
      }
    }
  };

  return (
    <div>
      <form className={fullWidth().root} noValidate autoComplete="off">
        {Object.keys(attributes).map((key, index) => {
          if (index < 2) {
            return (
              <TextField
                value={program[key]}
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
                value={program[key]}
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
      <Fab
        disabled={
          props.loading.UPDATE_OPPORTUNITY || props.loading.CREATE_OPPORTUNITY
        }
        onClick={saveProgram}
        id="fabForm"
      >
        <FaRegSave id="save-icon-fab" />
      </Fab>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={1000}
        message={snackBarMessage}
      />
    </div>
  );
}
const mapStateToProps = (state) => ({
  loading: state.opportunities.loading,
  error: state.opportunities.error,
  message: state.opportunities.message,
});
export default connect(mapStateToProps, {
  createOpportunity,
  updateOpportunity,
})(ErForm);
