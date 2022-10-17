import React from "react";
import ConfirmDialog from "./popup/ConfirmDialog";
import WaitDialog from "./popup/WaitDialog";
import CancelableDialog from "./popup/CancelableDialog";
import YesNoDialog from "./popup/YesNoDialog";

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
