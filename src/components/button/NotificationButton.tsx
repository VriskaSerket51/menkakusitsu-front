import { NotificationsActive, NotificationsOff } from "@mui/icons-material";
import { CircularProgress, ListItemIcon, MenuItem } from "@mui/material";
import React from "react";
import { useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { deletePushToken, getPushToken } from "../FirebaseManager";
import { getPushApproved, setPushApproved } from "../../utils/PushManager";

function NotificationButton() {
    const [isLoading, setIsLoading] = useState(false);
    const [isNotificationOn, setIsNotificationOn] = useState(getPushApproved());

    return (
        <MenuItem
            onClick={() => {
                if (isLoading) {
                    return;
                }
                setIsLoading(true);
                if (isNotificationOn) {
                    unstable_batchedUpdates(() => {
                        deletePushToken((successed) => {
                            if (successed) {
                                setPushApproved(false);
                                setIsNotificationOn(false);
                            }
                            setIsLoading(false);
                        });
                    });
                } else {
                    unstable_batchedUpdates(() => {
                        getPushToken((successed) => {
                            if (successed) {
                                setPushApproved(true);
                                setIsNotificationOn(true);
                            }
                            setIsLoading(false);
                        });
                    });
                }
            }}
        >
            {isNotificationOn ? (
                <React.Fragment>
                    <ListItemIcon>
                        {isLoading ? (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: "primary.dark",
                                    zIndex: 1,
                                }}
                            />
                        ) : (
                            <NotificationsActive fontSize="small" />
                        )}
                    </ListItemIcon>
                    알림 켜짐
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <ListItemIcon>
                        {isLoading ? (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: "primary.dark",
                                    zIndex: 1,
                                }}
                            />
                        ) : (
                            <NotificationsOff fontSize="small" />
                        )}
                    </ListItemIcon>
                    알림 꺼짐
                </React.Fragment>
            )}
        </MenuItem>
    );
}

export default NotificationButton;
