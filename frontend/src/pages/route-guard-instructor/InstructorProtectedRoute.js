import React from "react";
import { Instructor } from "../../configurations/userRoles";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function InstructorProtectedRoute() {
  const { roles, token } = useSelector((state) => state.user);

  return roles !== null && roles.includes(Instructor) && token !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/home" />
  );
}

export default InstructorProtectedRoute;
