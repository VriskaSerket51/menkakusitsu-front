/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_WEB_TITLE: string;
    readonly VITE_WEB_PREFIX: string;
    readonly VITE_API_PREFIX: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.gif";