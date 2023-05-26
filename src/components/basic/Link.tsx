import { Box, Link, useTheme } from "@mui/material";
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
    const theme = useTheme();

    return (
        <Link
            href={href}
            underline="hover"
            target={newTab ? "_blank" : ""}
            rel={newTab ? "noopener" : ""}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    color: theme.palette.text.primary,
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
    const theme = useTheme();

    return (
        <NavLink color="inherit" to={to} style={{ textDecoration: "none" }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    color: theme.palette.text.primary,
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
