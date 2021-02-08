import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Opportunity from "../components/Opportunity";
import { fetchOpportunities } from "../actions/opportunitiesActions";
import Checkbox from "@material-ui/core/Checkbox";
import "../styles/ErDatabase.css";
import Fab from "@material-ui/core/Fab";
import { GrAdd } from "react-icons/gr";
import Modal from "../components/Modal";
function ErDatabase(props) {
  const [modal, setModal] = useState(false);
  useEffect(() => {
    props.fetchOpportunities();
    document.addEventListener("keydown", closeModal, false);

    return () => {
      document.removeEventListener("keydown", closeModal, false);
    };
  }, []);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = (e) => {
    if (e.keyCode === 27) {
      setModal(false);
    }
  };
  return (
    <div>
      <div className="app-title">
        <h1>External Resources Database</h1>
      </div>
      <div id="table-header" className="opportunity-container">
        <div id="delete-btn" className="opportunity-info">
          <Checkbox></Checkbox>
        </div>
        <div className="opportunity-info">Program</div>
        <div className="opportunity-info">Major</div>
        <div className="opportunity-info">Participants</div>
        <div className="opportunity-info">Deadline</div>
      </div>
      {props.opportunities.map((opportunity) => (
        <Opportunity
          name={opportunity.name}
          classification={opportunity.classification}
          url={opportunity.url}
          major={opportunity.major}
          participants={opportunity.participants}
          deadline={opportunity.deadline}
          key={opportunity._id}
        />
      ))}
      <Modal show={modal} />
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
