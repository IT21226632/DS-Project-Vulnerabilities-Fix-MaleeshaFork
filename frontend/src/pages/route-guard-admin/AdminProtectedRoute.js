import React from "react";
import { Admin } from "../../configurations/userRoles";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminProtectedRoute() {
  const { roles, token } = useSelector((state) => state.user);

  return roles !== null && roles.includes(Admin) && token !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/home" />
  );
}

export default AdminProtectedRoute;
