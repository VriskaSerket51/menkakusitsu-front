/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "production" | "test";
        PUBLIC_URL: string;
        REACT_APP_WEB_TITLE: string;
        REACT_APP_WEB_PREFIX: string;
        REACT_APP_API_PREFIX: string;
    }
}
