import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getPermissionLevel } from "../../utils/Utility";

interface PrivateRouteProps {
    permission: number;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    let { permission } = props;

    return getPermissionLevel() >= permission ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
};

export default PrivateRoute;
