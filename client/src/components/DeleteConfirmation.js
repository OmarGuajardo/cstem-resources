import React from "react";
import Button from "@material-ui/core/Button";
import "../styles/DeleteConfirmation.css";

function DeleteConfirmation(props) {
  return (
    <div>
      <Button
        onClick={props.handleDelete}
        className="delete-btn"
        variant="outlined"
        color="error"
      >
        YES
      </Button>
    </div>
  );
}

export default DeleteConfirmation;
