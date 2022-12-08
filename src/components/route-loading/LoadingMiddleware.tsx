import React, {
    useState,
    useMemo,
    useCallback,
    useEffect,
    useRef,
} from "react";
import { LoadingContext, LoadingGetterContext } from "./LoadingContext";
import nprogress from "nprogress";

export default function LoadingMiddleware({
    children,
    isLoading = false,
}: {
    children: React.ReactNode;
    isLoading?: boolean;
}) {
    const [loading, setLoading] = useState(isLoading);
    const isFirstRender = useRef(true);

    const start = useCallback(() => {
        nprogress.start();
        setLoading(true);
    }, []);

    const done = useCallback(() => {
        nprogress.done();
        setLoading(false);
    }, []);

    const restart = useCallback(() => {
        nprogress.done();
        nprogress.start();
    }, []);

    useEffect(() => {
        if (!isFirstRender.current) {
            if (isLoading && !loading) start();
            else if (loading) done();
        } else {
            isFirstRender.current = false;
        }
    }, [isLoading]);

    const loadingProvider = useMemo(
        () => (
            <LoadingContext.Provider value={{ start, done, restart }}>
                {children}
            </LoadingContext.Provider>
        ),
        []
    );

    return (
        <LoadingGetterContext.Provider value={loading}>
            {loadingProvider}
        </LoadingGetterContext.Provider>
    );
}
