import React from "react"
import { Logout } from "@mui/icons-material"
import { logout } from "../../utils/Api"
import { TITLE } from "../../utils/Constant"
import { clearTokens, redirecToHome } from "../../utils/Utility"
import { openWaitDialog } from "../popup/WaitDialog"
import { openYesNoDialog } from "../popup/YesNoDialog"
import { ListItemIcon, MenuItem } from "@mui/material"

function LogoutButton() {
    return (
        <MenuItem
            onClick={() => {
                openYesNoDialog(TITLE.Info, '정말 로그아웃 하시겠습니까?'
                    , () => {
                        openWaitDialog(TITLE.Info, '로그아웃 중입니다...')
                        logout((resp) => {
                            clearTokens()
                            redirecToHome()
                        })
                    }
                    , () => { }
                )
            }}
        >
            <ListItemIcon>
                <Logout fontSize="small" />
            </ListItemIcon>
            로그아웃
        </MenuItem>
    )
}

export default LogoutButton