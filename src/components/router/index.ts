import dayjs from "dayjs";
import { christmasTheme, defaultTheme } from "../../utils/Constant";

export type ThemeType = "christmas" | "snow" | "april-fools" | "none";

export const getTheme = (): { type: ThemeType; value: any } => {
    const day = dayjs();
    const month = day.month() + 1;
    const date = day.date();
    if (month === 4 && date === 1) {
        return {
            type: "april-fools",
            value: defaultTheme,
        };
    }
    if (month === 12) {
        return {
            type: "christmas",
            value: christmasTheme,
        };
    }
    if (month === 11) {
        return {
            type: "snow",
            value: defaultTheme,
        };
    }
    return {
        type: "none",
        value: defaultTheme,
    };
};

export { default as ThemeLayout } from "./ThemeLayout";
export { default as RouteWrapper } from "./RouteWrapper";
export { default as PrivateRoute } from "./PrivateRoute";
