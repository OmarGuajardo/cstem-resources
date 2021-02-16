import React from "react";
import Button from "@material-ui/core/Button";
import "../styles/DeleteConfirmation.css";

function DeleteConfirmation(props) {
  return (
    <div>
      <Button id="delete-btn" onClick={props.handleDelete} variant="outlined">
        YES
      </Button>
    </div>
  );
}

export default DeleteConfirmation;
