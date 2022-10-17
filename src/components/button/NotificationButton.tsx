import { NotificationsActive, NotificationsOff } from "@mui/icons-material"
import { CircularProgress, ListItemIcon, MenuItem } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import { unstable_batchedUpdates } from "react-dom"
import uuid from "react-uuid"
import { deletePushToken, getPushToken } from "../../FirebaseManager"
import { getPushApproved, setPushApproved } from "../../../utils/Utility"

function NotificationButton() {
    const [isLoading, setIsLoading] = useState(false)
    const [isNotificationOn, setIsNotificationOn] = useState(getPushApproved())

    useEffect(() => {
        if (!localStorage.getItem('device-id')) {
            localStorage.setItem('device-id', uuid())
        }
    }, [])

    return (
        <MenuItem
            onClick={() => {
                if (isLoading) {
                    return
                }
                setIsLoading(true)
                if (isNotificationOn) {
                    unstable_batchedUpdates(() => {
                        deletePushToken(() => {
                            setPushApproved(false)
                            setIsNotificationOn(false)
                            setIsLoading(false)
                        })
                    })
                }
                else {
                    unstable_batchedUpdates(() => {
                        getPushToken(() => {
                            setPushApproved(true)
                            setIsNotificationOn(true)
                            setIsLoading(false)
                        })
                    })
                }
            }}
        >
            {
                isNotificationOn
                    ?
                    <>
                        <ListItemIcon>
                            {
                                isLoading
                                    ?
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            color: "primary.dark",
                                            zIndex: 1,
                                        }}
                                    />
                                    :
                                    <NotificationsActive fontSize="small" />
                            }
                        </ListItemIcon>
                        알림 켜짐
                    </>
                    :
                    <>
                        <ListItemIcon>
                            {
                                isLoading
                                    ?
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            color: "primary.dark",
                                            zIndex: 1,
                                        }}
                                    />
                                    :
                                    <NotificationsOff fontSize="small" />
                            }
                        </ListItemIcon>
                        알림 꺼짐
                    </>
            }
        </MenuItem>
    )
}

export default NotificationButton