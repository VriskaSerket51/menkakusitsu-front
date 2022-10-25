import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPageView } from "./FirebaseManager";

function RouteTracker() {
    const location = useLocation();

    useEffect(() => {
        if (!window.location.href.startsWith("localhost")) {
            logPageView();
        }
    }, [location]);

    return <React.Fragment></React.Fragment>;
}

export default RouteTracker;
