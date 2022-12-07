import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getPermissionLevel, openInNewTab } from "../../utils/Utility";

interface NavbarItemProps {
    permission: number;
    href: string;
    color?: string;
    title: string;
    newTab?: boolean;
}

export function NavbarMenu(props: {
    title: string;
    color: string;
    menu: NavbarItemProps[];
}) {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    function onMouseOver(event: React.MouseEvent<HTMLButtonElement>) {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    }

    function onMouseLeave() {
        setAnchorEl(null);
    }

    return (
        <Box
            style={{
                display: "inline-block",
                marginLeft: "5rem",
            }}
        >
            <Button onClick={onMouseOver}>
                <Typography
                    sx={{ fontFamily: "DesignHouseB" }}
                    color={props.color}
                    variant="h4"
                >
                    {props.title}
                </Typography>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={onMouseLeave}
            >
                {props.menu.map((menu) => {
                    if (getPermissionLevel() >= menu.permission) {
                        return (
                            <MenuItem
                                key={menu.title}
                                onClick={() => {
                                    if (menu.newTab) {
                                        openInNewTab(menu.href);
                                    } else {
                                        navigate(menu.href);
                                    }
                                }}
                            >
                                {menu.title}
                            </MenuItem>
                        );
                    } else {
                        return <div key={menu.title}></div>;
                    }
                })}
            </Menu>
        </Box>
    );
}

export function NavbarButton(props: NavbarItemProps) {
    const navigate = useNavigate();

    if (getPermissionLevel() >= props.permission) {
        return (
            <Box
                style={{
                    display: "inline-block",
                    marginLeft: "5rem",
                }}
            >
                <Button
                    onClick={() => {
                        if (props.newTab) {
                            openInNewTab(props.href);
                        } else {
                            navigate(props.href);
                        }
                    }}
                >
                    <Typography
                        sx={{ fontFamily: "DesignHouseB" }}
                        color={props.color}
                        variant="h4"
                    >
                        {props.title}
                    </Typography>
                </Button>
            </Box>
        );
    } else {
        return <React.Fragment></React.Fragment>;
    }
}
