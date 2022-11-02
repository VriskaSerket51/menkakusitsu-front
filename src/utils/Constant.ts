import { createTheme } from "@mui/material/styles";

export const TITLE = {
    Info: "알림",
    Warning: "경고!",
    Alert: "잠시만요!",
    Notice: "공지사항",
};

export const defaultTheme = createTheme({
    typography: {
        fontFamily: "'NotoSansKR'",
    },
    palette: {
        background: {
            default: "#EDEDED",
        },
        primary: {
            main: "#279023",
            light: "#5fc152",
            dark: "#006100",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#4db6ac",
            light: "#82e9de",
            dark: "#00867d",
        },
    },
});

export const christmasTheme = createTheme({
    typography: {
        fontFamily: "'NotoSansKR'",
    },
    palette: {
        background: {
            default: "#EDEDED",
        },
        primary: {
            main: "#C9040C",
        },
        secondary: {
            main: "#28560C",
        },
    },
});
