import React, { useEffect, useState } from "react";
import "../styles/Modal.css";
import { ImCross } from "react-icons/im";

function Modal(props) {
  return (
    <div className={props.show ? "background-blur" : "background-blur hidden"}>
      <div
        style={{
          width: props.modalAppSettings.width,
          height: props.modalAppSettings.height,
        }}
        className="modal-container"
      >
        <div className="modal-heading">
          <h2>{props.modalAppSettings.name}</h2>
          <ImCross onClick={props.closeFunc} id="exitForm" />
        </div>
        <div className="modal-content">{props.modalAppSettings.component}</div>
      </div>
    </div>
  );
}
export default Modal;
