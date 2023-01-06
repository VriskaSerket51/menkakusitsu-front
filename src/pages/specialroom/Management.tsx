import {
    Alert,
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    CircularProgress,
    Container,
    FormControlLabel,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
import FixedNavbar from "../../components/navbar";
import PaperTitle from "../../components/PaperTitle";
import { arrayRemove, getUserInfo } from "../../utils/Utility";
import {
    closeWaitDialog,
    openWaitDialog,
    SpecialroomInfoPanel,
} from "../../components";
import { getSpecialroomInfo, putSpecialroomInfo } from "../../utils/Api";
import { SpecialroomInfo } from "@common-jshs/menkakusitsu-lib/v1";
import { TITLE } from "../../utils/Constant";

function Management() {
    const [information, setInformation] = useState<SpecialroomInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const userInfo = getUserInfo();

    interface InfoCellProps {
        state: number;
    }

    const InfoCell = useCallback(
        (props: InfoCellProps) => {
            let count = 0;
            const final: SpecialroomInfo[] = [];
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
                                                    {`신청자: ${information.master.name}`}
                                                </Typography>
                                                <Typography>
                                                    {`신청 명단: ${
                                                        information.applicants
                                                    } - 총 ${
                                                        information.applicants.split(
                                                            ","
                                                        ).length
                                                    }인`}
                                                </Typography>
                                                <Typography>
                                                    {`신청 장소: ${information.location}`}
                                                </Typography>
                                                <Typography>
                                                    {`신청 시간: ${information.when}차 면학`}
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
                                            TITLE.Info,
                                            "처리 중입니다..."
                                        );
                                        putSpecialroomInfo(
                                            {
                                                information: final.map(
                                                    (information) => {
                                                        information.state = 1;
                                                        return information;
                                                    }
                                                ),
                                            },
                                            (result) => {
                                                closeWaitDialog();
                                                setInformation(
                                                    result.information
                                                );
                                            }
                                        );
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
                                            TITLE.Info,
                                            "처리 중입니다..."
                                        );
                                        putSpecialroomInfo(
                                            {
                                                information: final.map(
                                                    (information) => {
                                                        information.state = -1;
                                                        return information;
                                                    }
                                                ),
                                            },
                                            (result) => {
                                                closeWaitDialog();
                                                setInformation(
                                                    result.information
                                                );
                                            }
                                        );
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
        getSpecialroomInfo({}, (result) => {
            setInformation(
                result.information.filter(
                    (info) => info.teacher.uid == userInfo?.uid
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
                        <PaperTitle>특별실 신청 관리</PaperTitle>
                        <SpecialroomInfoPanel
                            filter={(info) =>
                                info.teacher.uid == userInfo?.uid
                            }
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
                                    특별실 신청 내역
                                </Typography>
                                <br />
                                {isLoading ? (
                                    <CircularProgress />
                                ) : (
                                    <InfoCell state={0} />
                                )}
                            </Box>
                            <Stack
                                spacing={2}
                                direction="column"
                                sx={{
                                    width: "50%",
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        textAlign: "center",
                                        p: 2,
                                        border: "1px dashed grey",
                                        width: "100%",
                                    }}
                                >
                                    <Typography variant="h5">
                                        승인된 신청
                                    </Typography>
                                    <br />
                                    {isLoading ? (
                                        <CircularProgress />
                                    ) : (
                                        <InfoCell state={1} />
                                    )}
                                </Box>
                                <Box
                                    sx={{
                                        textAlign: "center",
                                        p: 2,
                                        border: "1px dashed grey",
                                        width: "100%",
                                    }}
                                >
                                    <Typography variant="h5">
                                        거부된 신청
                                    </Typography>
                                    <br />
                                    {isLoading ? (
                                        <CircularProgress />
                                    ) : (
                                        <InfoCell state={-1} />
                                    )}
                                </Box>
                            </Stack>
                        </Stack>
                    </Box>
                </Paper>
            </Container>
        </React.Fragment>
    );
}

export default Management;
