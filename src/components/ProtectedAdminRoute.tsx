import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAdminToken } from "../utils/auth";

const ProtectedAdminRoute = () => {
    const token = getAdminToken();
    return token ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedAdminRoute;
