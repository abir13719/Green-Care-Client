import React from "react";
import useAdmin from "../hooks/useAdmin";
import { Navigate } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const [isAdmin] = useAdmin();

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center font-bold">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (isAdmin) {
    return children;
  }

  return <Navigate to="/" replace></Navigate>;
};

export default AdminRoutes;
