import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import "../styles/DeleteConfirmation.css";

function DeleteConfirmation(props) {
  const [open, setOpen] = useState(true);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  useEffect(() => {
    if (props.error) {
      setOpen(true);
      setSnackBarMessage("There was a problem deleting opportunity");
    } else if (!props.loading.DELETE_OPPORTUNITY && !props.error) {
      setOpen(true);
      setSnackBarMessage("Opportunity deleted!");
    } else if (props.loading.DELETE_OPPORTUNITY) {
      setOpen(true);
      setSnackBarMessage("Deleting opportunity...");
    }
  }, [props.error, props.loading.DELETE_OPPORTUNITY]);
  useEffect(() => {
    setOpen(false);
  }, [props.closeFunc]);
  return (
    <div>
      <Button
        disabled={props.loading.DELETE_OPPORTUNITY}
        id="delete-btn"
        onClick={props.handleDelete}
        variant="outlined"
      >
        YES
      </Button>
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
  error: state.opportunities.error,
  loading: state.opportunities.loading,
});

export default connect(mapStateToProps, {})(DeleteConfirmation);
// export default DeleteConfirmation;
