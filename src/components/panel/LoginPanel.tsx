import "../../styles/LoginForm.css";

import React from "react";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import {
    openConfirmDialog,
    closeWaitDialog,
    openWaitDialog,
    openCancelableDialog,
} from "../popup";
import { DialogTitle } from "../../utils/Constant";
import { SubmitButton } from "../button";
import { getPushToken } from "../FirebaseManager";
import { getPushApproved } from "../../utils/PushManager";
import { PostLoginResponse } from "@common-jshs/menkakusitsu-lib/v1";
import { postLogin } from "../../utils/Api";

const onPostLogin = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id = data.get("id")?.toString();
    const password = data.get("password")?.toString();
    if (!id || !password) {
        return;
    }
    openWaitDialog(DialogTitle.Info, "로그인 중입니다...");
    postLogin({ id: id, password: password }, onLoginSuccessed, onLoginFailed);
};

const onLoginSuccessed = (result: PostLoginResponse) => {
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
        getPushToken(() => {
            onFinished();
        });
    } else {
        onFinished();
    }
};

const onLoginFailed = (result: PostLoginResponse) => {
    closeWaitDialog();
    openConfirmDialog(DialogTitle.Info, result.message, () => {});
};

function LoginPopup() {
    return (
        <Box
            sx={{
                borderRadius: "16px",
                width: "auto",
                height: 400,
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
                        <Link
                            href="#"
                            onClick={() => {
                                openConfirmDialog(
                                    DialogTitle.Info,
                                    "지금은 신규가입이 불가능합니다."
                                );
                            }}
                            variant="body2"
                            underline="none"
                        >
                            아직 계정이 없으신가요?
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

function LoginPanel() {
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
                    openCancelableDialog("", <LoginPopup />);
                }}
            >
                이디저디 LOGIN
            </SubmitButton>
        </Box>
    );
}

export default LoginPanel;
