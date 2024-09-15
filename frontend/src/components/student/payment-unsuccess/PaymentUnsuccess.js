import React from "react";
import placeholderImage from "../../../images/payment-unsuccess.jpg";
import { Link } from "react-router-dom";
import "./payment-unsuccess.styles.css";

function PaymentUnsuccess() {
  return (
    <div className="payment-unsuccess-container">
      <img
        src={placeholderImage}
        alt="unsuccessful-payment"
        className="unsuccess-placeholder-image"
      />
      <span className="unsuccess-info-phrase">
        Payment Not Successful! Try Again!
      </span>
      <Link to="/student/dashboard/cart">
        <button className="back-to-home-btn">Continue</button>
      </Link>
    </div>
  );
}

export default PaymentUnsuccess;
