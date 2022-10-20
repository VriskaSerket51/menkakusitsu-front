import React from "react";

function PreventUnload() {
    React.useMemo(() => {
        window.addEventListener("beforeunload", (event) => {
            event.preventDefault();
            event.returnValue = "";
        });
    }, []);
    return <React.Fragment></React.Fragment>;
}

export default PreventUnload;
