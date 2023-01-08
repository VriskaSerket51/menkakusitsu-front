import { Box } from "@mui/material";
import React from "react";
import { ThemeType } from ".";
import christmasImg from "../../assets/christmas.png";

interface ThemeLayoutProps {
    type: ThemeType;
}

function ThemeAddon(props: ThemeLayoutProps) {
    const { type } = props;

    switch (type) {
        case "christmas":
            return (
                <Box
                    sx={{
                        background: `url(${christmasImg}) repeat`,
                        textIndent: "-1000em",
                        position: "absolute",
                        left: "0",
                        top: "0",
                        width: "100%",
                        height: "70px",
                        pointerEvents: "none",
                        cursor: "default",
                    }}
                />
            );
        default:
            return <React.Fragment />;
    }
}

export default ThemeAddon;