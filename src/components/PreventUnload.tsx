import React from "react";

function PreventUnload() {
    function beforeunload(this: Window, event: BeforeUnloadEvent) {
        event.preventDefault();
        event.returnValue = "";
    }

    React.useEffect(() => {
        window.addEventListener("beforeunload", beforeunload);
        return () => window.removeEventListener("beforeunload", beforeunload);
    }, []);
    return <React.Fragment></React.Fragment>;
}

export default PreventUnload;
