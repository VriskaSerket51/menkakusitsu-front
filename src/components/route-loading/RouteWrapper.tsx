import React, { useMemo } from "react";
import {
    Location,
    NavigationType,
    UNSAFE_LocationContext,
    useRoutes,
} from "react-router";
import { LoadingRouteObject } from "./utils";

interface RouteWrapperProps {
    routes: LoadingRouteObject[];
    location: Location;
    navigationType: NavigationType;
    hidden?: boolean;
}

export function RouteWrapper(props: RouteWrapperProps) {
    const { routes, location, navigationType, hidden } = props;
    const element = useRoutes(routes, location);

    return (
        <div style={hidden ? { display: "none" } : undefined}>
            {useMemo(
                () => (
                    <UNSAFE_LocationContext.Provider
                        value={{ location, navigationType }}
                    >
                        {element}
                    </UNSAFE_LocationContext.Provider>
                ),
                [location]
            )}
        </div>
    );
}
