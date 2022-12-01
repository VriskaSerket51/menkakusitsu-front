interface ImportMeta {
    readonly env: {
        MODE: string;
        readonly VITE_WEB_TITLE: string;
        readonly VITE_WEB_PREFIX: string;
        readonly VITE_API_PREFIX: string;
    };
}

declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.gif";
