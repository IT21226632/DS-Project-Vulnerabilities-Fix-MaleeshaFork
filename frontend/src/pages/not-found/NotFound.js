import React from "react";
import "./not-found.styles.css";
import NotFoundImage from "../../images/not-found.jpg";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found-page-container">
      <img
        src={NotFoundImage}
        alt="not-found-image"
        className="not-found-image-placeholder"
      />
      <span className="guide-phrase">
        Page you are looking for does not exist!
      </span>
      <Link to="/home">
        <button className="back-to-home-btn">Back to Home Page</button>
      </Link>
    </div>
  );
}

export default NotFound;
