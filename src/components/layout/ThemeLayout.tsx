import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { SnowParticle } from "../particles/snow";

interface ThemeLayoutProps {
    type: "christmas" | "snow" | "none";
}

function ThemeLayout(props: ThemeLayoutProps) {
    switch (props.type) {
        case "christmas":
            return (
                <React.Fragment>
                    <Box
                        style={{
                            background:
                                "url(http://cfs.tistory.com/static/sticker/s_18.png) repeat",
                            textIndent: "-1000em",
                            position: "absolute",
                            left: "0",
                            top: "0",
                            width: "100%",
                            height: "70px",
                        }}
                    ></Box>
                    <SnowParticle />
                    <Outlet />
                </React.Fragment>
            );
        case "snow":
            return (
                <React.Fragment>
                    <SnowParticle />
                    <Outlet />
                </React.Fragment>
            );
        case "none":
            return <Outlet />;
    }
}

export default ThemeLayout;

export * from "../particles/snow";
