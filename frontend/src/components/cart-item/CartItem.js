import React from "react";
import { useDispatch } from "react-redux";
import { removeCourse } from "../../features/Cart.slice";
import { MdDelete } from "react-icons/md";
import { IoPricetag } from "react-icons/io5";
import "./cart-item.styles.css";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const { _id, courseName, coursePrice, courseImage, skills } = item;

  return (
    <div className="cart-item-container">
      <img src={courseImage} alt="" className="thumbnail-placeholder" />
      <div className="citem-details-section">
        <span className="citem-course-name">{courseName}</span>
        <span className="citem-course-price">
          <IoPricetag className="citem-icon" /> ${coursePrice.toFixed(2)}
        </span>
        <span className="citem-advice">This course covers:</span>
        <div className="citem-skill-container">
          {skills !== null &&
            skills.map((skill, index) => {
              return (
                <span className="citem-skill-badge" key={index}>
                  {skill}
                </span>
              );
            })}
        </div>
      </div>
      <div className="citem-options">
        <button
          className="citem-remove-btn"
          onClick={() => dispatch(removeCourse(_id))}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
