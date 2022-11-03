import {
    Box,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import FixedNavbar from "../components/navbar";
import { closeWaitDialog, openWaitDialog, SubmitButton } from "../components";
import { SHA3_512, validateEmail } from "../utils/Utility";
import { getMyPrivateInfo, putMyEmail, putMyPassword } from "../utils/Api";
import { TITLE } from "../utils/Constant";

function AccountSetting() {
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        getMyPrivateInfo({}, (result) => {
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
                    openWaitDialog(TITLE.Info, "잠시만 기다려주세요...");
                    putMyEmail(
                        { oldEmail: email, newEmail: newEmail },
                        (result) => {
                            closeWaitDialog();
                            setEmail(result.newEmail);
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
                    openWaitDialog(TITLE.Info, "잠시만 기다려주세요...");
                    putMyPassword(
                        {
                            oldPassword: SHA3_512(oldPassword),
                            newPassword: SHA3_512(newPassword),
                        },
                        (result) => {
                            closeWaitDialog();
                            window.location.reload();
                        }
                    );
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

interface SidebarItem {
    title: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    icon: ReactNode;
    drawPanel: () => ReactNode;
}

const sidebarItems: SidebarItem[] = [
    {
        title: "계정",
        icon: <ManageAccountsIcon />,
        drawPanel: () => <AccountSetting />,
    },
    {
        title: "기타",
        icon: <MoreHorizIcon />,
        drawPanel: () => {
            return (
                <React.Fragment>
                    <Typography>더 필요한 것은 피드백 ㄱㄱ</Typography>
                </React.Fragment>
            );
        },
    },
];

function Setting() {
    const [currentSidebarItem, setCurrentSidebarItem] = useState<SidebarItem>(
        sidebarItems[0]
    );

    return (
        <React.Fragment>
            <FixedNavbar />
            <Container
                maxWidth="lg"
                sx={{
                    margin: "30px auto 50px",
                }}
            >
                <Paper>
                    <Box sx={{ display: "flex" }}>
                        <Box
                            sx={{
                                width: 200,
                            }}
                        >
                            <List>
                                {sidebarItems.map((sidebarItem, index) => (
                                    <ListItemButton
                                        key={sidebarItem.title}
                                        selected={
                                            sidebarItem.title ===
                                            currentSidebarItem.title
                                        }
                                        onClick={() => {
                                            setCurrentSidebarItem(sidebarItem);
                                        }}
                                    >
                                        <ListItemIcon>
                                            {sidebarItem.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={sidebarItem.title}
                                        />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Box>
                        <Box
                            sx={{
                                padding: "50px 50px 30px 50px",
                                width: "100%",
                            }}
                        >
                            {currentSidebarItem.drawPanel()}
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </React.Fragment>
    );
}

export default Setting;
