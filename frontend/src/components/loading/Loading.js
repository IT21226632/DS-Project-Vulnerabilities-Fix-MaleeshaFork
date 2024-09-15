import React from "react";
import loadingImage from "../../images/no-results.jpg";
import "./loading.styles.css";

function Loading({ passer }) {
  const { message } = passer;
  return (
    <div className="loading-container">
      <img src={loadingImage} alt="loading-image" className="loading-image" />
      <span className="screen-phrase">{message}</span>
    </div>
  );
}

export default Loading;
