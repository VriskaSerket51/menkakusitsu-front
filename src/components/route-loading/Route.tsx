import React from "react";
import {
    Route as OriginalRoute,
    RouteProps as OriginalRouteProps,
} from "react-router";

type RouteProps = OriginalRouteProps & {
    loading?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Route({ loading, ...props }: RouteProps) {
    return <OriginalRoute {...props} />;
}
