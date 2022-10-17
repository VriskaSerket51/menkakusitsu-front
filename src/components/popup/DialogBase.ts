import { ReactNode } from "react";

export interface DialogProps {
    title: ReactNode,
    content: ReactNode,
    onYes?: Function,
    onNo?: Function,
    close: Function,
};