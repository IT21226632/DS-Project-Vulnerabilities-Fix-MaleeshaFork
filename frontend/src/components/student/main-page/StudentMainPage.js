import React, { useState, useEffect } from "react";
import Loading from "../../loading/Loading";
import CourseCard from "../../course-card/CourseCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BsCart3 } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import "./student-main-page.styles.css";

function StudentMainPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    console.log("rendered");
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3500/learnup/api/course-management/get-all-approved-courses"
      );
      if (response.data) {
        setCourses(response.data);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loading passer={{ message: "Loading Data" }} />
  ) : (
    <div className="student-main-page-container">
      <div className="course-display-container">
        <div className="insight-displayer">
          <Link className="insight-link">
            <div className="insight-container">
              <span className="insight-icon">
                <FiHeart />
              </span>
              <span className="item-counter"></span>
            </div>
          </Link>
          <Link className="insight-link" to="/student/dashboard/cart">
            <span className="insight-container">
              <span className="insight-icon">
                <BsCart3 />
              </span>
              <span className="item-counter">{items.length}</span>
            </span>
          </Link>
        </div>
        <span className="partition-heading">Available Courses</span>
        {courses.length < 1 ? (
          <Loading passer={{ message: "No Courses" }} />
        ) : (
          <div className="course-partition-canvas">
            {courses.map((course) => {
              if(course.courseStatus === "Approved"){
                return <CourseCard key={course._id} course={course} />;
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentMainPage;
