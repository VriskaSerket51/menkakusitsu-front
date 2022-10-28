import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface IconLinkProps {
    href: string;
    icon: ReactNode;
    label: string;
    newTab?: boolean;
}

function IconLink(props: IconLinkProps) {
    return (
        <Link
            href={props.href}
            underline="none"
            target={props.newTab ? "_blank" : ""}
            rel={props.newTab ? "noopener" : ""}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                {props.icon}
                {props.label}
            </Box>
        </Link>
    );
}

export default IconLink;
