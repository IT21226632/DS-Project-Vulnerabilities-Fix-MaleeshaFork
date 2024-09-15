import React, { useState, useEffect } from "react";
import Loading from "../../loading/Loading";
import EnrollmentRecord from "../../enrollment-record/EnrollmentRecord";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./enrollments.styles.css";

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [executed, setExecuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user_id } = useSelector((state) => state.user);

  const unenrolFromCourse = async (enrollment_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4001/learnup/api/course-enrollment/unenroll/${enrollment_id}`
      );
      if (response.data) {
        toast.success(
          response.data.message || "Unenrolled from the course successfully!"
        );
        setExecuted(true);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  const getEnrollments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4001/learnup/api/course-enrollment/get-enrollments/${user_id}`
      );
      if (response.data) {
        setEnrollments(response.data);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEnrollments();
    setExecuted(false);
  }, [executed]);

  return loading ? (
    <Loading passer={{ message: "Loading Data" }} />
  ) : (
    <div className="enrollments-page-container">
      <div className="enrollments-display-container">
        <span className="partition-heading">My Enrollments</span>
        {enrollments.length < 1 ? (
          <Loading passer={{ message: "No Enrollments Yet!" }} />
        ) : (
          <div className="enrollment-partition-canvas">
            {enrollments.map((enrollmentData) => {
              return (
                <EnrollmentRecord
                  record={enrollmentData}
                  key={enrollmentData.course_id._id}
                  unenrollFromCourse={unenrolFromCourse}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Enrollments;
