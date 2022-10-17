import React from "react"

function PreventUnload() {
    React.useMemo(() => {
        window.addEventListener('beforeunload', (event) => {
            event.preventDefault()
            event.returnValue = ''
        })
    }, [])
    return <></>
}

export default PreventUnload