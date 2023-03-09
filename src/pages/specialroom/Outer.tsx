import {
    Alert,
    Autocomplete,
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    CircularProgress,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import FixedNavbar from "../../components/navbar";
import PaperTitle from "../../components/PaperTitle";
import React, { useCallback, useEffect, useState } from "react";
import {
    openConfirmDialog,
    closeWaitDialog,
    openWaitDialog,
    openYesNoDialog,
} from "../../components/popup";
import {
    getSpecialroomInfo,
    getSpecialroomLocationInfo,
    getSpecialroomManagerInfo,
    getSpecialroomPurposeInfo,
    getSpecialroomStudentInfo,
    getSpecialroomTeacherInfo,
    isApiSuccessed,
    postSpecialroomApply,
    postUserPush,
    putSpecialroomInfo,
} from "../../utils/Api";
import { DialogTitle } from "../../utils/Constant";
import { SpecialroomInfoPanel } from "../../components/panel";
import { SubmitButton } from "../../components/button";
import { v1 } from "@common-jshs/menkakusitsu-lib";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { arrayRemove, getTokenPayload } from "../../utils/Utility";

/*
function Outer() {
    const [outsiders, setOutsiders] = useState([]);
    return (
        <React.Fragment>
            <Container
                maxWidth="lg"
                sx={{
                    margin: "30px auto 50px",
                }}
            >
                <Paper>
                    <Box sx={{ padding: "50px 30px 30px 30px" }}>
                        <PaperTitle>학생 외박 관리</PaperTitle>
                    </Box>
                </Paper>
            </Container>
        </React.Fragment>
    );
}*/

function Outer() {
    const [information, setInformation] = useState<v1.SpecialroomInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const payload = getTokenPayload();

    interface InfoCellProps {
        state: number;
    }

    const InfoCell = useCallback(
        (props: InfoCellProps) => {
            let count = 0;
            const final: v1.SpecialroomInfo[] = [];
            const result = (
                <React.Fragment>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                    >
                        {information.map((information) => {
                            if (information.state === props.state) {
                                count += 1;
                                return (
                                    <Tooltip
                                        placement="left-start"
                                        key={information.applyId}
                                        title={
                                            <Box sx={{ textAlign: "left" }}>
                                                <Typography>
                                                    {`담당 선생님: ${information.master.name}`}
                                                </Typography>
                                                <Typography>
                                                    {`외출/외박: ${information.when}`}
                                                </Typography>
                                                <Typography>
                                                    {`인원: ${
                                                        information.applicants
                                                    }`}
                                                </Typography>
                                                <Typography>
                                                    {`목적: ${information.purpose}`}
                                                </Typography>
                                            </Box>
                                        }
                                        arrow
                                    >
                                        <FormControlLabel
                                            label={information.purpose}
                                            control={
                                                <Checkbox
                                                    color="secondary"
                                                    onChange={(event) => {
                                                        if (
                                                            event.target.checked
                                                        ) {
                                                            final.push(
                                                                information
                                                            );
                                                        } else {
                                                            arrayRemove(
                                                                final,
                                                                information
                                                            );
                                                        }
                                                    }}
                                                />
                                            }
                                        />
                                    </Tooltip>
                                );
                            } else {
                                return (
                                    <React.Fragment
                                        key={information.applyId}
                                    ></React.Fragment>
                                );
                            }
                        })}
                    </Stack>
                    <Box sx={{ textAlign: "center" }}>
                        <ButtonGroup variant="contained">
                            {props.state !== 1 && (
                                <Button
                                    color="success"
                                    onClick={() => {
                                        openWaitDialog(
                                            DialogTitle.Info,
                                            "처리 중입니다..."
                                        );
                                        putSpecialroomInfo({
                                            information: final.map(
                                                (information) => {
                                                    information.state = 1;
                                                    return information;
                                                }
                                            ),
                                        }).then((result) => {
                                            closeWaitDialog();
                                            setInformation(result.information);
                                        });
                                    }}
                                >
                                    승인
                                </Button>
                            )}
                            {props.state !== -1 && (
                                <Button
                                    color="error"
                                    onClick={() => {
                                        openWaitDialog(
                                            DialogTitle.Info,
                                            "처리 중입니다..."
                                        );
                                        putSpecialroomInfo({
                                            information: final.map(
                                                (information) => {
                                                    information.state = -1;
                                                    return information;
                                                }
                                            ),
                                        }).then((result) => {
                                            closeWaitDialog();
                                            setInformation(result.information);
                                        });
                                    }}
                                >
                                    거부
                                </Button>
                            )}
                        </ButtonGroup>
                    </Box>
                </React.Fragment>
            );
            if (count === 0) {
                return <Alert severity="info">남은 항목이 없습니다!</Alert>;
            }
            return result;
        },
        [information]
    );

    useEffect(() => {
        getSpecialroomInfo({}).then((result) => {
            setInformation(
                result.information.filter(
                    (info) => info.teacher.uid == payload?.uid
                )
            );
            setIsLoading(false);
        });
    }, []);

    return (
        <React.Fragment>
            <Container
                maxWidth="lg"
                sx={{
                    margin: "30px auto 50px",
                }}
            >
                <Paper>
                    <Box sx={{ padding: "50px 30px 30px 30px" }}>
                        <PaperTitle>학생 외박 관리</PaperTitle>
                        <SpecialroomInfoPanel
                            filter={(info) => info.teacher.uid == payload?.uid}
                        />
                        <Stack
                            spacing={2}
                            direction="row"
                            sx={{ marginTop: "32px" }}
                        >
                        <Box
                            sx={{
                                textAlign: "center",
                                p: 2,
                                border: "1px dashed grey",
                                width: "50%",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h4">
                                외출
                            </Typography>
                            <br />
                            {isLoading ? (
                                <CircularProgress />
                            ) : (
                                <InfoCell state={0} />
                            )}
                        </Box>
                        <Box
                            sx={{
                                textAlign: "center",
                                p: 2,
                                border: "1px dashed grey",
                                width: "50%",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h4">
                                외박
                            </Typography>
                            <br />
                            {isLoading ? (
                                <CircularProgress />
                            ) : (
                                <InfoCell state={0} />
                            )}
                        </Box>
                        </Stack>
                    </Box>
                </Paper>
            </Container>
        </React.Fragment>
    );
}

export default Outer;
