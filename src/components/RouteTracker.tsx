import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPageView } from "./FirebaseManager.js";

function RouteTracker() {
    const location = useLocation();

    useEffect(() => {
        const host = window.location.href;
        if (
            !host.startsWith("localhost") &&
            !host.startsWith("127.") &&
            !host.startsWith("192.")
        ) {
            logPageView();
        }
    }, [location]);

    return <React.Fragment></React.Fragment>;
}

export default RouteTracker;
