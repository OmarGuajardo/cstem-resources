import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import Opportunity from "../components/Opportunity";
import {
  fetchOpportunities,
  deleteOpportunity,
} from "../actions/opportunitiesActions";
import "../styles/ErDatabase.css";
import Fab from "@material-ui/core/Fab";
import { GrAdd, GrTrash } from "react-icons/gr";
import Modal from "../components/Modal";

import Button from "@material-ui/core/Button";
import ErForm from "../components/ErForm";
import DeleteConfirmation from "../components/DeleteConfirmation";
import TextField from "@material-ui/core/TextField";
import {
  UPDATE_OPPORTUNITY,
  CREATE_OPPORTUNITY,
  DELETE_OPPORTUNITY,
} from "../actions/types";
import { Fragment } from "react";
import Skeleton from "@yisheng90/react-loading";

function ErDatabase(props) {
  const [modal, setModal] = useState(false);
  const [stagedDelete, setStagedDelete] = useState([]);
  const [modalAppSettings, setModalAppSettings] = useState({});
  const [classification, setClassification] = useState("INL");
  const handleChange = (e) => {
    setClassification(e.target.value);
  };
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
  useEffect(() => {
    props.fetchOpportunities(classification);
    document.addEventListener("keydown", closeModalOnPress, false);
    return () => {
      document.removeEventListener("keydown", closeModalOnPress, false);
    };
  }, [classification]);
  const openModal = (actionType, opportunity) => {
    const settings = {
      name: "",
      height: "",
      width: "",
      component: "",
    };
    switch (actionType) {
      case CREATE_OPPORTUNITY:
        settings.name = "New Opportunity";
        settings.height = "65%";
        settings.width = "60%";
        settings.component = <ErForm type="POST" opportunity={null} />;
        break;
      case UPDATE_OPPORTUNITY:
        settings.name = "Update Opportunity";
        settings.height = "65%";
        settings.width = "60%";
        settings.component = <ErForm type="PUT" opportunity={opportunity} />;
        break;
      case DELETE_OPPORTUNITY:
        settings.name = "Delete these items?";
        settings.height = "auto";
        settings.width = "30%";
        settings.component = (
          <DeleteConfirmation
            closeFunc={closeModal}
            handleDelete={handleDelete}
          />
        );
        break;
      default:
        break;
    }
    setModalAppSettings(settings);
    setModal(true);
  };
  const closeModalOnPress = (e) => {
    if (e.keyCode === 27) {
      setModal(false);
    }
  };
  const closeModal = () => {
    setModal(false);
  };

  const addToDeleteStage = (e, opportunity) => {
    if (e.target.checked) {
      setStagedDelete([...stagedDelete, opportunity]);
    } else {
      const filtered = stagedDelete.filter((opp) => opp._id != opportunity._id);
      setStagedDelete(filtered);
    }
  };
  const handleDelete = () => {
    let stagedDeleteID = stagedDelete.map((op) => op._id);
    props.deleteOpportunity(stagedDeleteID);
    setStagedDelete([]);
  };
  const loadingOpportunities = (
    <Fragment>
      <Skeleton color={"#3f6146"} rows={10} width={"100%"} height={"23%"} />
    </Fragment>
  );
  const loadedOpportunities = (
    <Fragment>
      <div id="table-header" className="opportunity-container">
        <div id="delete-btn" className="opportunity-info"></div>
        <div className="opportunity-info">Program</div>
        <div className="opportunity-info">Major</div>
        <div className="opportunity-info">Participants</div>
        <div className="opportunity-info">Deadline</div>
      </div>
      {props.opportunities.map((opportunity) => (
        <Opportunity
          openModal={openModal}
          handleOnChange={addToDeleteStage}
          opportunity={opportunity}
          key={opportunity._id}
        />
      ))}
    </Fragment>
  );
  return (
    <div style={{ width: "100%" }}>
      <div className="app-title">
        <h1>External Resources Database</h1>
        <div id={stagedDelete.length > 0 ? "hidden" : ""}>
          <TextField
            id="standard-basic"
            select
            label="CLASSIFICATION"
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
        </div>

        <Button
          onClick={() => openModal(DELETE_OPPORTUNITY)}
          variant="contained"
          id={stagedDelete.length > 0 ? "delete-btn-table" : "hidden"}
          color="primary"
          startIcon={<GrTrash />}
        >
          Delete
        </Button>
      </div>
      {props.loading.FETCH_OPPORTUNITY
        ? loadingOpportunities
        : loadedOpportunities}

      <Modal
        modalAppSettings={modalAppSettings}
        closeFunc={closeModal}
        show={modal}
      />
      <Fab
        disabled={props.loading.FETCH_OPPORTUNITY}
        onClick={() => {
          openModal(CREATE_OPPORTUNITY);
        }}
        id="fabDB"
      >
        <GrAdd id="add-icon-fab" />
      </Fab>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  opportunities: state.opportunities.items,
  loading: state.opportunities.loading,
});

export default connect(mapStateToProps, {
  fetchOpportunities,
  deleteOpportunity,
})(ErDatabase);
