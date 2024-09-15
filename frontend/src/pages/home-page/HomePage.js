import React from "react";
import NavBar from "../../components/navbar/NavBar";
import heroImage from "../../images/hero-image.jpg";
import "./home.styles.css";

function HomePage() {
  return (
    <div className="home-page-container">
      <NavBar />
      <div className="hero-section-container">
        <div className="hero-sect-content">
          <span className="tag-line">
            <span className="highlighter">LearnUp:</span>
            <br /> Elevating Education, Empowering Minds
          </span>
          <p className="support-phrase">
            Where Knowledge Meets Opportunity. Our platform redefines education
            by providing seamless access to diverse learning resources,
            fostering a culture of continuous growth and empowerment. Join us to
            embark on a journey of limitless possibilities and unlock your full
            potential with LearnUp.
          </p>
          <button className="get-start-btn"></button>
        </div>
        <img src={heroImage} alt="hero-image" className="hero-sect-image" />
      </div>
    </div>
  );
}

export default HomePage;
