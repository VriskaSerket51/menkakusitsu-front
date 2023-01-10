import React from "react";
import { Logout } from "@mui/icons-material";
import { deleteLogout } from "../../utils/Api";
import { DialogTitle } from "../../utils/Constant";
import { clearTokens, redirectToHome } from "../../utils/Utility";
import { openWaitDialog, openYesNoDialog } from "../popup";
import { ListItemIcon, MenuItem } from "@mui/material";
import { onLogout } from "../../utils/AuthManager";

function LogoutButton() {
    return (
        <MenuItem
            onClick={() => {
                openYesNoDialog(
                    DialogTitle.Info,
                    "정말 로그아웃 하시겠습니까?",
                    () => {
                        openWaitDialog(DialogTitle.Info, "로그아웃 중입니다...");
                        deleteLogout({}, onLogout);
                    }
                );
            }}
        >
            <ListItemIcon>
                <Logout fontSize="small" />
            </ListItemIcon>
            로그아웃
        </MenuItem>
    );
}

export default LogoutButton;
