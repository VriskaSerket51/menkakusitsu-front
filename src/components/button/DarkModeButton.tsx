import { NotificationsActive, NotificationsOff } from "@mui/icons-material";
import { ListItemIcon, MenuItem } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { LightMode, DarkMode } from "@mui/icons-material";

function DarkModeButton() {
    const { style, toggleStyle } = useContext(ThemeContext)!;

    return (
        <MenuItem
            onClick={() => {
                toggleStyle();
            }}
        >
            {style == "light" ? (
                <React.Fragment>
                    <ListItemIcon>
                        <LightMode fontSize="small" />
                    </ListItemIcon>
                    Light Mode
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <ListItemIcon>
                        <DarkMode fontSize="small" />
                    </ListItemIcon>
                    Dark Mode
                </React.Fragment>
            )}
        </MenuItem>
    );
}

export default DarkModeButton;
