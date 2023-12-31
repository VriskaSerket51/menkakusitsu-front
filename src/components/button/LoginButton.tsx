import React from "react";
import { Box } from "@mui/material";
import { openCancelableDialog } from "../popup";
import { SubmitButton } from "../button";
import { LoginPanel } from "../panel";

export default function LoginButton() {
    return (
        <Box
            sx={{
                width: "auto",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <SubmitButton
                color="primary.main"
                onClick={() => {
                    openCancelableDialog("", <LoginPanel />);
                }}
            >
                이디저디 LOGIN
            </SubmitButton>
        </Box>
    );
}
