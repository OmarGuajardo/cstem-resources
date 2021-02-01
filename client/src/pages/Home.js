import Reach from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to the CSTEM Resources Interface</h1>
      <Link to="/login">
        <button>Get Started</button>
      </Link>
    </div>
  );
}

export default Home;
