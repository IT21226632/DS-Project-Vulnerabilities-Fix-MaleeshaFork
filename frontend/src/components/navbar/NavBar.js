import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/learnup.png";
import "./nav-bar.styles.css";

function NavBar() {
  return (
    <div className="nav-container">
      <img src={logo} alt="logo" className="logo-section" />
      <div className="link-section">
        <Link className="text-link" to="/create-account/instructor">
          Teach on Learnup
        </Link>
        <Link className="btn-link signin" to="/sign-in">
          Sign in
        </Link>
        <Link className="btn-link signup" to="/create-account/student">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
