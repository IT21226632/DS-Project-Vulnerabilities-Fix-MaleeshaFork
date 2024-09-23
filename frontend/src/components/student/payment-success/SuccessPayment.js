import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../features/Cart.slice";
import placeholderImage from "../../../images/payment-success.jpg";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import "./payment-success.styles.css";

function SuccessPayment() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    if (items !== null && items.length > 0 && user_id !== null) {
      items.forEach((course) => {
        enrollToCourse(course._id, user_id);
      });
    }
    toast.success("you have enrolled to the bought courses!");
    dispatch(clearCart());
  }, [location]);

  const enrollToCourse = async (course, user) => {
    try {
      const response = await axios.post(
        "http://localhost:4001/learnup/api/course-enrollment/enroll",
        { course_id: course, user_id: user }
      );
      console.log(`enrollment passed with ${course} and ${user}`);
      if (response) {
        console.log(`enrollment added with ${course} and ${user}`);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <div className="payment-success-container">
      <img
        src={placeholderImage}
        alt=""
        className="success-placeholder-image"
      />
      <span className="success-info-phrase">Congrats! Payment Successful!</span>
      <Link to="/student/dashboard">
        <button className="back-to-home-btn">Continue</button>
      </Link>
    </div>
  );
}

export default SuccessPayment;
