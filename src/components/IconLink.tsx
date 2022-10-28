import { Box, Link } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import React, { ReactNode } from "react";

interface IconLinkProps {
    href: string;
    icon?: ReactNode;
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
                {props.icon ? props.icon : <LinkIcon />}
                {props.label}
            </Box>
        </Link>
    );
}

export default IconLink;
