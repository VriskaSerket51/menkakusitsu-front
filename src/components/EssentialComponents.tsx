import React from "react";
import { LazyAction } from "./lazyload";
import {
    ConfirmDialog,
    WaitDialog,
    CancelableDialog,
    YesNoDialog,
} from "./popup";

function EssentialComponents() {
    return (
        <React.Fragment>
            <ConfirmDialog />
            <WaitDialog />
            <YesNoDialog />
            <CancelableDialog />
            <LazyAction />
        </React.Fragment>
    );
}

export default EssentialComponents;
