import "../../styles/LoginForm.css";

import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { openConfirmDialog, closeWaitDialog, openWaitDialog } from "../popup";
import { DialogTitle } from "../../utils/Constant";
import { getPushToken } from "../FirebaseManager";
import { getPushApproved } from "../../utils/PushManager";
import { v1 } from "@common-jshs/menkakusitsu-lib";
import { postLogin } from "../../utils/Api";
import { IconNavLink } from "../basic/Link";
import { AccountBox } from "@mui/icons-material";
import { SHA3_512 } from "../../utils/Utility";

const onPostLogin = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id = data.get("id")?.toString();
    const password = data.get("password")?.toString();
    if (!id || !password) {
        return;
    }
    openWaitDialog(DialogTitle.Info, "로그인 중입니다...");
    try {
        const result = await postLogin(
            { id: id, password: SHA3_512(password) }
        );
        if (result.accessToken !== "")
            onLoginSuccessed(result);
        else
            onLoginFailed(result);
    }
    catch (err) {
        console.error(err);
    }
};

const onLoginSuccessed = async (result: v1.PostLoginResponse) => {
    localStorage.setItem("access-token", result.accessToken);
    localStorage.setItem("refresh-token", result.refreshToken);

    const onFinished = () => {
        if (result.callbacks) {
            if (result.callbacks.includes("needChangePw")) {
                openConfirmDialog(
                    DialogTitle.Alert,
                    "기존 4자리 학번을 비밀번호로 사용하시는 경우, 비밀번호를 바꾸셔야합니다.",
                    () => {
                        window.location.href = "/setting";
                    }
                );
                return;
            }
            if (result.callbacks.includes("needChangeEmail")) {
                openConfirmDialog(
                    DialogTitle.Alert,
                    "비밀번호 복구 등의 서비스를 이용하시려면 이메일을 추가하셔야합니다.",
                    () => {
                        window.location.href = "/setting";
                    }
                );
                return;
            }
        }
        window.location.reload();
    };

    if (getPushApproved()) {
        try {
            const result = await getPushToken();
            onFinished();
        }
        catch (err) {
            console.error(err);
        }
    } else {
        onFinished();
    }
};

const onLoginFailed = (result: v1.PostLoginResponse) => {
    closeWaitDialog();
    openConfirmDialog(DialogTitle.Info, result.message, () => { });
};

export default function LoginPanel() {
    return (
        <Box
            sx={{
                width: "auto",
                height: "100%",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
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
            <Box
                component="form"
                onSubmit={onPostLogin}
                sx={{ mt: 1, padding: "0 30px 0" }}
            >
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
                        backgroundColor: "primary.main",
                        "&:hover": {
                            backgroundColor: "#fff",
                            color: "primary.main",
                        },
                        fontFamily: "BMDohyeon",
                    }}
                >
                    LOGIN
                </Button>
                <Grid container>
                    {/* <Grid item xs>
                        <Link
                            href="#"
                            onClick={() => {
                                openConfirmDialog(TITLE.Info, "미구현");
                            }}
                            variant="body2"
                            underline="none"
                        >
                            비밀번호를 잊어버리셨나요?
                        </Link>
                    </Grid> */}
                    <Grid item>
                        <IconNavLink
                            to="/auth/register"
                            label="아직 계정이 없으신가요?"
                            icon={<AccountBox />}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
