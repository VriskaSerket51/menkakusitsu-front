import { Box, Link } from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";
import React, { ReactNode } from "react";

interface IconLinkProps {
    href: string;
    icon?: ReactNode;
    label: string;
    newTab?: boolean;
}

export function IconLink(props: IconLinkProps) {
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

interface IconNavLinkProps {
    to: string;
    icon?: ReactNode;
    label: string;
}

export function IconNavLink(props: IconNavLinkProps) {
    const { to, icon, label } = props;

    return (
        <NavLink color="inherit" to={to} style={{ textDecoration: "none" }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    color: "black",
                    "&:hover": {
                        textDecoration: "underline #000000",
                    },
                }}
            >
                {icon || <LinkIcon />} {label}
            </Box>
        </NavLink>
    );
}
