import React from "react";

import "../styles/Application.css";
import ErDatabase from "../apps/ErDatabase";
function Application(props) {
  return (
    <div className="app-container">
      <div className="application-content">
        <ErDatabase />
      </div>
    </div>
  );
}

export default Application;
