import { createContext } from "react";

type ThemeContextType = {
    style: string;
    toggleStyle: Function;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);