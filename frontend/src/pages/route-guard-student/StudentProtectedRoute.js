import React from "react";
import { Student } from "../../configurations/userRoles";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function StudentProtectedRoute() {
  const { roles, token } = useSelector((state) => state.user);

  return roles !== null && roles.includes(Student) && token !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/home" />
  );
}

export default StudentProtectedRoute;
