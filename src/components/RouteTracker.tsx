import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPageView } from "./FirebaseManager.js";

function RouteTracker() {
    const location = useLocation()

    useEffect(() => {
        if (!window.location.href.startsWith('localhost')) {
            logPageView()
        }
    }, [location])

    return (<></>)
}

export default RouteTracker