import React from "react";
import { Link } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import Button from "@material-ui/core/Button";

function Home() {
  return (
    <div className="background">
      <FaReact className="login-icon" />
      <FaReact id="top-right" className="login-icon-background" />
      <FaReact id="bottom-left" className="login-icon-background" />
      <h1>CSTEM</h1>
      <h1>RESOURCES</h1>
      <Link to="/login">
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}

export default Home;
