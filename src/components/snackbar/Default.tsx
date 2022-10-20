import {
    Box,
    Card,
    CardActions,
    IconButton,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { SnackbarContent, useSnackbar } from "notistack";
import React, { forwardRef, Ref } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { MessagePayload } from "firebase/messaging";

interface SnackbarProps {
    id: string | number;
    payload: MessagePayload;
}

export const DefaultSnackbar = forwardRef(
    (props: SnackbarProps, ref: Ref<HTMLDivElement>) => {
        const { id, payload } = props;
        const { closeSnackbar } = useSnackbar();
        const navigate = useNavigate();

        const onClose = () => {
            closeSnackbar(id);
        };

        return (
            <SnackbarContent
                ref={ref}
                style={
                    useMediaQuery("")
                        ? {
                              minWidth: "",
                          }
                        : {}
                }
                onClick={() => {
                    onClose();
                    if (
                        payload &&
                        payload.fcmOptions &&
                        payload.fcmOptions.link
                    ) {
                        window.location.href = payload.fcmOptions.link;
                    }
                }}
            >
                <Card
                    sx={{
                        backgroundColor: "secondary.main",
                        width: "100%",
                    }}
                >
                    <CardActions
                        sx={{
                            padding: "8px 8px 8px 16px",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: "#fff",
                                fontFamily: "BMDohyeon",
                            }}
                        >
                            {payload?.notification?.title}
                        </Typography>
                        <Box
                            sx={{
                                marginLeft: "auto",
                            }}
                        >
                            <IconButton
                                size="small"
                                sx={{
                                    padding: "8px 8px",
                                    transform: "rotate(0deg)",
                                    color: "#fff",
                                    transition: "all .2s",
                                }}
                                onClick={onClose}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </CardActions>
                </Card>
            </SnackbarContent>
        );
    }
);
