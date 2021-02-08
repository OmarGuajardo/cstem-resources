import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Opportunity from "../components/Opportunity";
import { fetchOpportunities } from "../actions/opportunitiesActions";
import Checkbox from "@material-ui/core/Checkbox";
import "../styles/ErDatabase.css";
import Fab from "@material-ui/core/Fab";
import { GrAdd, GrTrash } from "react-icons/gr";
import Modal from "../components/Modal";

import Button from "@material-ui/core/Button";
// import DeleteIcon from "@material-ui/icons/Delete";

function ErDatabase(props) {
  const [modal, setModal] = useState(false);
  const [stagedDelete, setStagedDelete] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    props.fetchOpportunities();
    document.addEventListener("keydown", closeModalOnPress, false);
    return () => {
      document.removeEventListener("keydown", closeModalOnPress, false);
    };
  }, []);
  const openModal = () => {
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

  return (
    <div>
      <div className="app-title">
        <h1>External Resources Database</h1>
        <Button
          onClick={() => console.log(stagedDelete)}
          variant="contained"
          id={stagedDelete.length > 0 ? "delete-btn-table" : "hidden"}
          color="primary"
          startIcon={<GrTrash />}
        >
          Delete
        </Button>
      </div>
      <div id="table-header" className="opportunity-container">
        <div id="delete-btn" className="opportunity-info"></div>
        <div className="opportunity-info">Program</div>
        <div className="opportunity-info">Major</div>
        <div className="opportunity-info">Participants</div>
        <div className="opportunity-info">Deadline</div>
      </div>
      {props.opportunities.map((opportunity) => (
        <Opportunity
          handleOnChange={addToDeleteStage}
          opportunity={opportunity}
          key={opportunity._id}
        />
      ))}
      <Modal closeFunc={closeModal} show={modal} />
      <Fab onClick={openModal} id="fabDB">
        <GrAdd id="add-icon-fab" />
      </Fab>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  opportunities: state.opportunities.items,
});

export default connect(mapStateToProps, { fetchOpportunities })(ErDatabase);
