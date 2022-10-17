import React from "react";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { apiPOST, SHA3_512 } from "../../utils/Utility";
import "../../styles/LoginForm.css";
import { openConfirmDialog, closeWaitDialog, openWaitDialog, openCancelableDialog } from "../popup"
import { TITLE } from "../../utils/Constant"
import SubmitButton from "../SubmitButton"
import { getPushToken } from "../FirebaseManager"
import { getPushApproved } from "../../utils/PushManager"

const onPostLogin = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id = data.get("id")?.toString();
    const pw = data.get("password")?.toString();
    if (!id || !pw) {
        return;
    }
    openWaitDialog("알림", "로그인 중입니다...")
    apiPOST("/v1/auth/login", {
        id: id,
        password: SHA3_512(pw)
    })
        .then((resp) => {
            const result = resp.data
            if (result.status >= 0) {
                onLoginSuccessed(result)
            }
            else {
                onLoginFailed(result)
            }
        })
        .catch((e) => {
            console.log(e)
        })
}

const onLoginSuccessed = (result) => {
    localStorage.setItem("access-token", result.access_token)
    localStorage.setItem("refresh-token", result.refresh_token)
    if (getPushApproved()) {
        getPushToken(() => {
            window.location.reload()
        })
    }
    else {
        window.location.reload()
    }
}

const onLoginFailed = (result) => {
    closeWaitDialog()
    openConfirmDialog(TITLE.Info, result.message, () => { })
}

const loginPopup = <>
    <Box sx={{
        borderRadius: "16px",
        width: "auto",
        height: 400,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }}>
        <Typography
            variant="h5"
            noWrap
            sx={{
                mr: 2,
                fontWeight: 500,
                fontFamily: "BMDohyeon",
                color: "inherit",
                textDecoration: "none",
            }}
        >
            로그인하세요.
        </Typography>
        <Box component="form" onSubmit={onPostLogin} sx={{ mt: 1, padding: "0 30px 0" }}>
            <TextField
                className="inputRounded"
                margin="normal"
                required
                fullWidth
                id="id"
                label="ID"
                name="id"
            />
            <TextField
                className="inputRounded"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                    mt: 3,
                    mb: 2,
                    borderRadius: "50px",
                    backgroundColor: "#279023",
                    "&:hover": {
                        backgroundColor: "#fff",
                        color: "#279023",
                    },
                    fontFamily: "BMDohyeon",
                }}
            >
                LOGIN
            </Button>
            <Grid container>
                <Grid item xs>
                    <Link href="" variant="body2" underline="none">
                        비밀번호를 잊어버리셨나요?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2" underline="none">
                        아직 계정이 없으신가요?
                    </Link>
                </Grid>
            </Grid>
        </Box>
    </Box>
</>

function LoginPanel() {
    return (
        <>
            <Box sx={{
                width: "auto",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <SubmitButton
                    color="primary.main"
                    onClick={() => {
                        openCancelableDialog("", loginPopup, () => { })
                    }}
                >
                    이디저디 LOGIN
                </SubmitButton>
            </Box>
        </>
    )
}

export default LoginPanel