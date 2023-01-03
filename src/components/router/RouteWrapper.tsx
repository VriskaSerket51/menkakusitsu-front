import React from "react";
import { SnackbarProvider } from "notistack";
import { Outlet } from "react-router-dom";
import FirebaseManager from "../FirebaseManager";
import RouteTracker from "../RouteTracker";
import create from "zustand";
import FixedNavbar from "../navbar";
import Footer from "../Footer";
import {
    CancelableDialog,
    ConfirmDialog,
    WaitDialog,
    YesNoDialog,
} from "../popup";

export interface RouteWrapperProps {
    noHeader?: boolean;
    noFooter?: boolean;
}

const useRouteWrapperStore = create<RouteWrapperProps>((set) => ({
    noHeader: false,
    noFooter: false,
}));

export default function RouteWrapper() {
    const { noHeader, noFooter } = useRouteWrapperStore();

    return (
        <React.Fragment>
            <ConfirmDialog />
            <WaitDialog />
            <YesNoDialog />
            <CancelableDialog />
            <SnackbarProvider
                maxSnack={5}
                autoHideDuration={6000}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <FirebaseManager />
                <RouteTracker />
                {!noHeader && <FixedNavbar />}
                <Outlet />
                {!noFooter && <Footer />}
            </SnackbarProvider>
        </React.Fragment>
    );
}

export const setHeaderActive = (value: boolean) => {
    useRouteWrapperStore.setState({
        noHeader: !value,
    });
};

export const setFooterActive = (value: boolean) => {
    useRouteWrapperStore.setState({
        noFooter: !value,
    });
};