import React from "react";
import { Link } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import "../styles/Home.css";
function Home() {
  return (
    <div className="background">
      <FaReact className="home-icon" />
      <FaReact id="top-right" className="login-icon-background" />
      <FaReact id="bottom-left" className="login-icon-background" />
      <h1 className="header1">C-STEM</h1>
      <h1 className="header2">RESOURCES</h1>
      <Link style={{ textDecoration: "none" }} to="/login">
        <div id="get-started-btn">Get Started</div>
      </Link>
    </div>
  );
}

export default Home;
