import { v1 } from "@common-jshs/menkakusitsu-lib";
import {
    Box,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Paper,
    TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
    closeWaitDialog,
    openWaitDialog,
} from "../../components";
import PaperTitle from "../../components/PaperTitle";
import { deleteSecession, getSpecialroomStudentInfo } from "../../utils/Api";
import { DialogTitle } from "../../utils/Constant";
interface UserBoxProps {
    user: v1.UserInfo;
    setUsers: Dispatch<SetStateAction<v1.UserInfo[]>>;
}

function UserBox(props: UserBoxProps) {
    const { user, setUsers } = props;
    return (
        <Grid item xs={3}>
            <FormControlLabel
                label={user.name}
                control={
                    <Checkbox
                        color="secondary"
                        onChange={(event) => {
                            if (event.target.checked) {
                                openWaitDialog(
                                    DialogTitle.Info,
                                    "처리 중입니다..."
                                );
                                deleteSecession({
                                    name: user.name,
                                }).then((result) => {
                                    closeWaitDialog();
                                    getSpecialroomStudentInfo({}).then(
                                        (result) => {
                                            setUsers(result.studentInfo);
                                        }
                                    );
                                });
                            }
                        }}
                    />
                }
            />
        </Grid>
    );
}

export default function UserManagement() {
    const [users, setUsers] = useState<v1.UserInfo[]>([]);

    useEffect(() => {
        getSpecialroomStudentInfo({}).then((result) => {
            setUsers(result.studentInfo);
        });
    }, []);

    return (
        <React.Fragment>
            <Container
                maxWidth="md"
                sx={{
                    margin: "30px auto 50px",
                }}
            >
                <Paper>
                    <Box
                        component="form"
                        sx={{ padding: "50px 30px 30px 30px" }}
                    >
                        <PaperTitle>유저 관리</PaperTitle>
                        <Box sx={{ padding: "30px 30px 30px" }}>
                            <TextField label="이름" name="name" />
                            <br />
                            <br />
                            <Grid container spacing={2}>
                                {users.map((user) => {
                                    return (
                                        <UserBox
                                            key={user.name}
                                            user={user}
                                            setUsers={setUsers}
                                        />
                                    );
                                })}
                            </Grid>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </React.Fragment>
    );
}
