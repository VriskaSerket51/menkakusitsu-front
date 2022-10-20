import React from "react";
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
        </React.Fragment>
    );
}

export default EssentialComponents;
