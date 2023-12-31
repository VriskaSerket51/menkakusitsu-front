import { Box, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
    closeWaitDialog,
    openConfirmDialog,
    openWaitDialog,
    SubmitButton,
} from "../../../components";
import { SHA3_512, validateEmail } from "../../../utils/Utility";
import {
    getMyPrivateInfo,
    isApiSuccessed,
    putMyEmail,
    putMyPassword,
} from "../../../utils/Api";
import { DialogTitle } from "../../../utils/Constant";

function AccountSetting() {
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        getMyPrivateInfo({}).then((result) => {
            setEmail(result.private.email!);
        });
    }, []);

    const drawChangeEmail = useCallback(() => {
        const [errorText, setErrorText] = useState<string | null>(null);

        return (
            <Box
                component="form"
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    setErrorText(null);
                    const data = new FormData(event.currentTarget);
                    const newEmail = data.get("email")?.toString();
                    if (email === null || !newEmail) {
                        return;
                    }
                    if (email == newEmail) {
                        setErrorText(
                            "이건 당신이 이미 쓰고 계시는 이메일입니다."
                        );
                        return;
                    }
                    if (!validateEmail(newEmail)) {
                        setErrorText("유효하지 않은 이메일입니다!");
                        return;
                    }
                    openWaitDialog(DialogTitle.Info, "잠시만 기다려주세요...");
                    putMyEmail({ oldEmail: email, newEmail: newEmail }).then(
                        (result) => {
                            if (isApiSuccessed(result)) {
                                closeWaitDialog();
                                setEmail(result.newEmail);
                            } else {
                                closeWaitDialog();
                                openConfirmDialog(
                                    DialogTitle.Info,
                                    result.message
                                );
                            }
                        }
                    );
                }}
                sx={{ width: "50%" }}
            >
                <Typography variant="h5">이메일 변경</Typography>
                <br />
                {email !== null && (
                    <TextField
                        size="small"
                        label="이메일"
                        name="email"
                        error={Boolean(errorText)}
                        helperText={errorText}
                        defaultValue={email}
                        fullWidth
                        required
                    />
                )}
                <br />
                <br />
                <SubmitButton color="primary.main" width="25%" height="40px">
                    변경
                </SubmitButton>
            </Box>
        );
    }, [email]);

    const drawChangePassword = useCallback(() => {
        const [errorText, setErrorText] = useState<string | null>(null);

        return (
            <Box
                component="form"
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    setErrorText(null);
                    const data = new FormData(event.currentTarget);
                    const oldPassword = data.get("oldPassword")?.toString();
                    const newPassword = data.get("newPassword")?.toString();
                    const newPasswordRe = data.get("newPasswordRe")?.toString();
                    if (!oldPassword || !newPassword || !newPasswordRe) {
                        return;
                    }
                    if (newPassword != newPasswordRe) {
                        setErrorText(
                            "비밀번호와 비밀번호 다시 입력이 다릅니다."
                        );
                        return;
                    }
                    openWaitDialog(DialogTitle.Info, "잠시만 기다려주세요...");
                    putMyPassword({
                        oldPassword: SHA3_512(oldPassword),
                        newPassword: SHA3_512(newPassword),
                    }).then((result) => {
                        if (isApiSuccessed(result)) {
                            closeWaitDialog();
                            window.location.reload();
                        } else {
                            closeWaitDialog();
                            openConfirmDialog(DialogTitle.Info, result.message);
                        }
                    });
                }}
                sx={{ width: "50%" }}
            >
                <Typography variant="h5">비밀번호 변경</Typography>
                <br />
                <TextField
                    size="small"
                    label="이전 비밀번호"
                    name="oldPassword"
                    type="password"
                    fullWidth
                    required
                />
                <br />
                <br />
                <TextField
                    size="small"
                    label="새 비밀번호"
                    name="newPassword"
                    type="password"
                    error={Boolean(errorText)}
                    helperText={errorText}
                    fullWidth
                    required
                />
                <br />
                <br />
                <TextField
                    size="small"
                    label="새 비밀번호 다시 입력"
                    name="newPasswordRe"
                    type="password"
                    error={Boolean(errorText)}
                    helperText={errorText}
                    fullWidth
                    required
                />
                <br />
                <br />
                <SubmitButton color="primary.main" width="25%" height="40px">
                    변경
                </SubmitButton>
            </Box>
        );
    }, [email]);

    return (
        <React.Fragment>
            {drawChangeEmail()}
            <br />
            <br />
            {drawChangePassword()}
            <br />
            <br />
        </React.Fragment>
    );
}

export default AccountSetting;
