import dayjs from "dayjs";
import { christmasTheme, defaultTheme } from "./themes";

export type ThemeType =
    | "spring"
    | "summer"
    | "fall"
    | "winter"
    | "christmas"
    | "april-fools"
    | "none";

export const getThemeType = () => {
    const day = dayjs();

    const month = day.month() + 1;
    const date = day.date();

    if (month === 4 && date === 1) {
        return "april-fools";
    }
    if (month >= 3 && month <= 5) {
        return "spring";
    }

    if (month >= 6 && month <= 8) {
        return "summer";
    }

    if (month >= 9 && month <= 11) {
        return "fall";
    }

    if (month === 12) {
        return "christmas";
    }
    if (month <= 2) {
        return "winter";
    }
    return "none";
};

export const getTheme = (type: ThemeType) => {
    switch (type) {
        case "spring":
        case "summer":
        case "fall":
        case "winter":
        case "april-fools":
        case "none":
            return defaultTheme;
        case "christmas":
            return christmasTheme;
    }
};

export { default as ThemeAddon } from "./ThemeAddon";
