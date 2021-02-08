import React from "react";
import "../styles/Modal.css";
function Modal(props) {
  return (
    <div className={props.show ? "background-blur" : "background-blur hidden"}>
      <div className="form-container"></div>
    </div>
  );
}

export default Modal;
