import {
    Alert,
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    CircularProgress,
    Container,
    FormControlLabel,
    Grid,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
import FixedNavbar from "../../components/navbar";
import PaperTitle from "../../components/PaperTitle";
import { getUserInfo } from "../../utils/Utility";
import { SpecialroomInfoPanel } from "../../components";
import { getSpecialroomInfo, putSpecialroomInfo } from "../../utils/Api";
import { unstable_batchedUpdates } from "react-dom";
import { SpecialroomInfo } from "@common-jshs/menkakusitsu-lib/v1";

function Management() {
    const [information, setInformation] = useState<SpecialroomInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [needReload, setNeedReload] = useState(true);

    useEffect(() => {
        getSpecialroomInfo({}, (result) => {
            unstable_batchedUpdates(() => {
                setInformation(result.information);
                setIsLoading(false);
                // setNeedReload(false);
            });
        });
    }, []);
    const renderInfo = useCallback(
        (state) => {
            if (information) {
                let count = 0;
                const final: SpecialroomInfo[] = [];
                const result = (
                    <React.Fragment>
                        <Stack sx={{ textAlign: "center" }}>
                            {information.map((information) => {
                                if (
                                    information.teacher.uid ===
                                        getUserInfo().uid &&
                                    information.state === state
                                ) {
                                    count += 1;
                                    return (
                                        <Tooltip
                                            placement="left-start"
                                            key={information.applyId}
                                            title={
                                                <Box sx={{ textAlign: "left" }}>
                                                    <Typography>
                                                        신청자:{" "}
                                                        {
                                                            information.master
                                                                .name
                                                        }
                                                    </Typography>
                                                    <Typography>
                                                        신청 명단:{" "}
                                                        {information.applicants}{" "}
                                                        - 총{" "}
                                                        {
                                                            information.applicants.split(
                                                                ","
                                                            ).length
                                                        }
                                                        인
                                                    </Typography>
                                                    <Typography>
                                                        신청 장소:{" "}
                                                        {information.location}
                                                    </Typography>
                                                    <Typography>
                                                        신청 시간:{" "}
                                                        {information.when}차
                                                        면학
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
                                                                event.target
                                                                    .checked
                                                            ) {
                                                                final.push(
                                                                    information
                                                                );
                                                            } else {
                                                                const index =
                                                                    final.indexOf(
                                                                        information
                                                                    );
                                                                if (
                                                                    index > -1
                                                                ) {
                                                                    final.splice(
                                                                        index,
                                                                        1
                                                                    );
                                                                }
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
                                {state !== 1 && (
                                    <Button
                                        color="success"
                                        onClick={() => {
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
                                {state !== -1 && (
                                    <Button
                                        color="error"
                                        onClick={() => {
                                            putSpecialroomInfo(
                                                {
                                                    information: final.map(
                                                        (information) => {
                                                            information.state =
                                                                -1;
                                                            return information;
                                                        }
                                                    ),
                                                },
                                                (result) => {
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
            }
        },
        [information]
    );

    return (
        <>
            <FixedNavbar />
            <Container
                maxWidth="lg"
                sx={{
                    margin: "30px auto 50px",
                }}
            >
                <Paper>
                    <Box sx={{ padding: "50px 30px 30px 30px" }}>
                        <PaperTitle>특별실 신청 관리</PaperTitle>
                        <SpecialroomInfoPanel />
                        <Grid container spacing={2} sx={{ marginTop: "32px" }}>
                            <Grid item xs={7}>
                                <Box
                                    sx={{
                                        textAlign: "center",
                                        p: 2,
                                        border: "1px dashed grey",
                                    }}
                                >
                                    <Typography sx={{ fontSize: "32px" }}>
                                        특별실 신청 내역
                                    </Typography>
                                    {isLoading ? (
                                        <CircularProgress />
                                    ) : (
                                        renderInfo(0)
                                    )}
                                </Box>
                            </Grid>
                            <Grid item xs={5}>
                                <Box>
                                    <Box
                                        sx={{
                                            textAlign: "center",
                                            marginBottom: "16px",
                                            p: 2,
                                            border: "1px dashed grey",
                                        }}
                                    >
                                        <Typography sx={{ fontSize: "24px" }}>
                                            승인된 신청
                                        </Typography>
                                        {isLoading ? (
                                            <CircularProgress />
                                        ) : (
                                            renderInfo(1)
                                        )}
                                    </Box>
                                    <Box
                                        sx={{
                                            textAlign: "center",
                                            p: 2,
                                            border: "1px dashed grey",
                                        }}
                                    >
                                        <Typography sx={{ fontSize: "24px" }}>
                                            거부된 신청
                                        </Typography>
                                        {isLoading ? (
                                            <CircularProgress />
                                        ) : (
                                            renderInfo(-1)
                                        )}
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}

export default Management;
