import React, { ElementType, FC, ReactNode } from "react";
import LoadingRoutes from "./LoadingRoutes";
import LoadingMiddleware from "./LoadingMiddleware";

interface RoutesProps {
    children: ReactNode;
    loadingScreen?: ElementType;
    maxLoadingTime?: number;
    isLoading?: boolean;
}

// combine topbar and switcher
export default function Routes(props: RoutesProps) {
    const { children, loadingScreen, maxLoadingTime, isLoading } = props;

    return (
        <LoadingMiddleware isLoading={isLoading}>
            <LoadingRoutes
                loadingScreen={loadingScreen}
                maxLoadingTime={maxLoadingTime}
            >
                {children}
            </LoadingRoutes>
        </LoadingMiddleware>
    );
}
