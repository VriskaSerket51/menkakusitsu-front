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
    Typography
} from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
import FixedNavbar from "../../components/navbar";
import PaperTitle from "../../components/PaperTitle";
import { apiGET, apiPUT, getUserInfo } from "../../utils/Utility";
import SpecialroomInfo from "../../components/SpecialroomInfo";

function Management() {
    const [info, setInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [needReload, setNeedReload] = useState(true)

    useEffect(() => {
        if (needReload) {
            apiGET("/v1/specialroom/info")
                .then((resp) => {
                    const result = resp.data
                    if (result.status >= 0) {
                        setInfo(result.information)
                        setIsLoading(false)
                        setNeedReload(false)
                    }
                })
        }
    }, [needReload])

    const renderInfo = useCallback((approved_flag) => {
        if (info) {
            let count = 0
            const final = []
            const result =
                <>
                    <Stack sx={{ textAlign: 'center' }}>
                        {
                            info.map((information) => {
                                if (information.teacher_UID === getUserInfo().UID && information.approved_flag === approved_flag) {
                                    count += 1
                                    return (
                                        <Tooltip
                                            placement="left-start"
                                            key={information.apply_ID}
                                            title={<Box sx={{ textAlign: 'left' }}>
                                                <Typography>
                                                    신청자: {information.master}
                                                </Typography>
                                                <Typography>
                                                    신청 명단: {information.students} - 총 {information.students.split(',').length}인
                                                </Typography>
                                                <Typography>
                                                    신청 장소: {information.location}
                                                </Typography>
                                                <Typography>
                                                    신청 시간: {information.when}차 면학
                                                </Typography>
                                            </Box>}
                                            arrow
                                        >
                                            <FormControlLabel label={information.purpose} control={<Checkbox color="secondary"
                                                onChange={(event) => {
                                                    if (event.target.checked) {
                                                        final.push(information.apply_ID)
                                                    }
                                                    else {
                                                        const index = final.indexOf(information.apply_ID);
                                                        if (index > -1) {
                                                            final.splice(index, 1);
                                                        }
                                                    }
                                                }} />} />
                                        </Tooltip>
                                    )
                                } else {
                                    return (<React.Fragment key={information.apply_ID}></React.Fragment>)
                                }
                            })
                        }
                    </Stack>
                    <Box sx={{ textAlign: 'center' }}>
                        <ButtonGroup variant="contained">
                            {
                                (approved_flag !== 1) &&
                                <Button
                                    color="success"
                                    onClick={() => {
                                        final.forEach((applyID) => {
                                            apiPUT("/v1/specialroom/info", { applyID: applyID, isApproved: 1 })
                                                .then((resp) => { setNeedReload(true) })
                                        })
                                    }}
                                >
                                    승인
                                </Button>
                            }
                            {
                                (approved_flag !== -1) &&
                                <Button
                                    color="error"
                                    onClick={() => {
                                        final.forEach((applyID) => {
                                            apiPUT("/v1/specialroom/info", { applyID: applyID, isApproved: -1 })
                                                .then((resp) => { setNeedReload(true) })
                                        })
                                    }}
                                >
                                    거부
                                </Button>
                            }
                        </ButtonGroup>
                    </Box>
                </>
            if (count === 0) {
                return (
                    <Alert severity="info">
                        남은 항목이 없습니다!
                    </Alert>
                )
            }

            return result
        }
    }, [info])

    return (
        <>
            <FixedNavbar />
            <Container maxWidth="lg" sx={{
                margin: '30px auto 50px'
            }}>
                <Paper>
                    <Box sx={{ padding: '50px 30px 30px 30px' }}>
                        <PaperTitle title="특별실 신청 관리" />
                        <SpecialroomInfo />
                        <Grid container spacing={2} sx={{ marginTop: '32px' }}>
                            <Grid item xs={7}>
                                <Box sx={{ textAlign: 'center', p: 2, border: '1px dashed grey' }}>
                                    <Typography sx={{ fontSize: '32px' }}>
                                        특별실 신청 내역
                                    </Typography>
                                    {
                                        isLoading ?
                                            <CircularProgress />
                                            :
                                            renderInfo(0)
                                    }
                                </Box>
                            </Grid>
                            <Grid item xs={5}>
                                <Box>
                                    <Box sx={{ textAlign: 'center', marginBottom: '16px', p: 2, border: '1px dashed grey' }}>
                                        <Typography sx={{ fontSize: '24px' }}>
                                            승인된 신청
                                        </Typography>
                                        {
                                            isLoading ?
                                                <CircularProgress />
                                                :
                                                renderInfo(1)
                                        }
                                    </Box>
                                    <Box sx={{ textAlign: 'center', p: 2, border: '1px dashed grey' }}>
                                        <Typography sx={{ fontSize: '24px' }}>
                                            거부된 신청
                                        </Typography>
                                        {
                                            isLoading ?
                                                <CircularProgress />
                                                :
                                                renderInfo(-1)
                                        }
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </>
    )
}

export default Management