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
    const { href, icon, label, newTab } = props;

    return (
        <Link
            href={href}
            underline="hover"
            target={newTab ? "_blank" : ""}
            rel={newTab ? "noopener" : ""}
            color="black"
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                {icon || <LinkIcon />} {label}
            </Box>
        </Link>
    );
}

export default IconLink;
