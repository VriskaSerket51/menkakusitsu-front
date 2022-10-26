import React, {
    ReactElement,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

interface PagePanelProps {
    children?: React.ReactNode;
}

function useInterval(callback, delay) {
    const savedCallback = useRef<Function>();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        let id = setInterval(() => {
            if (savedCallback.current) {
                savedCallback.current();
            }
        }, delay);
        return () => clearInterval(id);
    }, [delay]);
}

function PagePanel(props: PagePanelProps) {
    const [page, setPage] = useState(0);
    const [childs, setChilds] = useState(
        React.Children.toArray(props.children) as ReactElement<any, any>[]
    );

    useInterval(() => {
        if (page + 1 === childs.length) {
            setPage(0);
        } else {
            setPage(page + 1);
        }
    }, 10000);

    return childs[page];
}

export default PagePanel;
