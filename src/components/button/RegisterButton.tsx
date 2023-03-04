import React from "react";
import { Box } from "@mui/material";
import { openCancelableDialog } from "../popup";
import { SubmitButton } from "../button";
import { RegisterPanel } from "../panel";

export default function RegisterButton() {
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
                    openCancelableDialog("", <RegisterPanel />);
                }}
            >
                이디저디 가입
            </SubmitButton>
        </Box>
    );
}
