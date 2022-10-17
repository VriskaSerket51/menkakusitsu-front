import React from "react"
import { Autocomplete, Box, Button, Container, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Step, StepContent, StepLabel, Stepper, TextField, Typography } from "@mui/material"
import { apiGET } from "../../utils/Utility";
// import PreventUnload from "../../components/PreventUnload";
import { openConfirmDialog } from "../../components/popup/ConfirmDialog";
import { closeWaitDialog, openWaitDialog } from "../../components/popup/WaitDialog";
import { getSpecialroomApplyStatus, postSpecialroomApply, sendPushNotification } from "../../utils/Api";
import { TITLE } from "../../utils/Constant";
import FixedNavbar from "../../components/navbar/FixedNavbar";
import SpecialroomInfo from "../../components/SpecialroomInfo";
import PaperTitle from "../../components/PaperTitle";
import SubmitButton from "../../components/SubmitButton";

function Apply() {
    const [locationInfos, setLocationInfos] = React.useState([]);
    const [purposeInfos, setPurposeInfos] = React.useState([]);
    const [studentInfos, setStudentInfos] = React.useState([]);
    const [teacherInfos, setTeacherInfos] = React.useState([]);

    const [when, setWhen] = React.useState(1)
    const [applicants, setAppltcants] = React.useState([]);
    const [teacher, setTeacher] = React.useState(null);

    const [activeStep, setActiveStep] = React.useState(0)

    const today = new Date()

    const steps = [
        {
            title: '사용 시간 선택',
            content: <>
                <Typography>
                    {today.getFullYear()}년 {today.getMonth() + 1}월 {today.getDate()}일
                </Typography>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="select-when">사용 시간</InputLabel>
                    <Select
                        labelId="select-when"
                        id="select-when"
                        value={when}
                        onChange={(event) => {
                            setWhen(event.target.value)
                        }}
                        label="사용 시간"
                        name="when"
                    >
                        <MenuItem value={1}>1차 면학</MenuItem>
                        <MenuItem value={2}>2차 면학</MenuItem>
                    </Select>
                </FormControl>
            </>
        },
        {
            title: '사용 장소 선택',
            content: <>
                <Typography>
                    신청 목적은 상관없지만 신청 장소는 바르게 선택해 주시기 바랍니다.
                </Typography>
                <FormControl>
                    <FormLabel id="specialroom-location">사용 장소</FormLabel>
                    <RadioGroup
                        aria-labelledby="specialroom-location"
                        name="specialroom-purpose"
                    >
                        {
                            locationInfos.map((location) => {
                                if (location.id >= 0) {
                                    return (
                                        <FormControlLabel key={location.id} id={`location${location.id}`} name="location" value={location.value} control={<Radio />} label={location.value} />
                                    )
                                } else {
                                    return (
                                        <FormControlLabel key={location.id} value={location.value} control={<Radio />} label={
                                            <TextField
                                                id={`location${location.id}`}
                                                name="location"
                                                label={location.value}
                                            />} />
                                    )
                                }
                            })
                        }
                    </RadioGroup>
                </FormControl>
            </>,
        },
        {
            title: '사용 목적 선택',
            content: <>
                <FormControl>
                    <FormLabel id="specialroom-purpose">사용 목적</FormLabel>
                    <RadioGroup
                        aria-labelledby="specialroom-purpose"
                        name="specialroom-purpose"
                    >
                        {
                            purposeInfos.map((purpose) => {
                                if (purpose.id >= 0) {
                                    return (
                                        <FormControlLabel key={purpose.id} id={`purpose${purpose.id}`} name="purpose" value={purpose.value} control={<Radio />} label={purpose.value} />
                                    )
                                } else {
                                    return (
                                        <FormControlLabel key={purpose.id} value={purpose.value} control={<Radio />} label={
                                            <TextField
                                                id={`purpose${purpose.id}`}
                                                name="purpose"
                                                label={purpose.value}
                                            />} />
                                    )
                                }
                            })
                        }
                    </RadioGroup>
                </FormControl>
            </>
        },
        {
            title: '학생 선택',
            content: <>
                <Typography>
                    학번 혹은 이름 입력 시 자동완성이 활성화됩니다.
                </Typography>
                <Autocomplete
                    multiple
                    id="autocomplete-students"
                    onChange={(event, newValue) => {
                        setAppltcants(newValue)
                    }}
                    options={studentInfos}
                    getOptionLabel={(option) => option.student_name}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="특별실 사용 학생 명단"
                            placeholder="예시) 2202 고승한"
                        />
                    )}
                />
            </>
        },
        {
            title: '선생님 선택',
            content: <>
                <Typography>
                    선생님 성함 입력 시 자동완성이 활성화됩니다.
                </Typography>
                <Autocomplete
                    id="autocomplete-teachers"
                    onChange={(event, newValue) => {
                        setTeacher(newValue)
                    }}
                    options={teacherInfos}
                    getOptionLabel={(option) => option.teacher_name}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="선생님 선택"
                            placeholder="예시) 강지현(지구과학) 선생님"
                        />
                    )}
                />
            </>
        },
    ]

    const onClickNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const onClickBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const onClickReset = () => {
        setActiveStep(0);
    }

    React.useMemo(async () => {
        await apiGET("/v1/specialroom/locations")
            .then((resp) => {
                const result = resp.data
                if (result.status >= 0) {
                    setLocationInfos(result.locations)
                }
            })
        await apiGET("/v1/specialroom/purposes")
            .then((resp) => {
                const result = resp.data
                if (result.status >= 0) {
                    setPurposeInfos(result.purposes)
                }
            })
        await apiGET("/v1/specialroom/students")
            .then((resp) => {
                const result = resp.data
                if (result.status >= 0) {
                    setStudentInfos(result.students)
                }
            })
        await apiGET("/v1/specialroom/teachers")
            .then((resp) => {
                const result = resp.data
                if (result.status >= 0) {
                    setTeacherInfos(result.teachers)
                }
            })
    }, []);

    const onPostApply = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const location = data.get("location")
        if (!location) {
            openConfirmDialog(TITLE.Alert, '사용 장소 선택을 하지 않으셨습니다.', () => { })
            setActiveStep(1)
            return
        }
        const purpose = data.get("purpose")
        if (!purpose) {
            openConfirmDialog(TITLE.Alert, '사용 목적 선택을 하지 않으셨습니다.', () => { })
            setActiveStep(2)
            return
        }
        if (applicants.length === 0) {
            openConfirmDialog(TITLE.Alert, '학생 명단 선택을 하지 않으셨습니다.', () => { })
            setActiveStep(3)
            return
        }
        if (!teacher) {
            openConfirmDialog(TITLE.Alert, '선생님 선택을 하지 않으셨습니다.', () => { })
            setActiveStep(4)
            return
        }
        openWaitDialog(TITLE.Info, '특별실을 신청하는 중입니다...')
        getSpecialroomApplyStatus(when, (resp) => {
            const result = resp.data
            if (result.status >= 0 && result.applyStatus) {
                closeWaitDialog()
                openConfirmDialog(TITLE.Alert, `${when}차 면학 때 이미 신청한 특별실이 있습니다.`, () => { })
            }
            else {
                postSpecialroomApply(location, purpose,
                    applicants.map(applicant => {
                        return { UID: applicant.UID, name: applicant.name }
                    }),
                    teacher.UID, when,
                    (resp) => {
                        const result = resp.data
                        if (result.status >= 0) {
                            closeWaitDialog()
                            openConfirmDialog(TITLE.info, '특별실 신청에 성공했습니다.', () => { })
                            sendPushNotification(teacher.UID, {
                                title: '학생들이 특별실을 신청했습니다.',
                                body: purpose,
                                link: `${import.meta.env.VITE_WEB_PREFIX}/specialroom/management`
                            })
                        }
                    })
            }
        })

    }

    return (
        <>
            {/* <PreventUnload /> */}
            <FixedNavbar />
            <Container maxWidth="md" sx={{
                margin: '30px auto 50px'
            }}>
                <Paper>
                    <Box component="form" onSubmit={onPostApply} sx={{ padding: '50px 30px 30px 30px' }}>
                        <PaperTitle title="특별실 신청하기" />
                        <SpecialroomInfo />
                        <Stepper activeStep={activeStep} orientation="vertical" sx={{ padding: '30px 30px 30px' }}>
                            {
                                steps.map((step, index) => {
                                    return (
                                        <Step key={step.title}>
                                            <StepLabel
                                                optional={
                                                    index === steps.length - 1 ? (
                                                        <Typography variant="caption">Last step</Typography>
                                                    ) : null
                                                }
                                            >
                                                {step.title}
                                            </StepLabel>
                                            <StepContent TransitionProps={{ unmountOnExit: false }} >
                                                {step.content}
                                                < Box sx={{ mb: 2 }}>
                                                    {
                                                        index !== steps.length - 1 &&
                                                        <Button
                                                            variant="contained"
                                                            onClick={onClickNext}
                                                            sx={{ mt: 1, mr: 1 }}
                                                        >
                                                            다음
                                                        </Button>
                                                    }

                                                    <Button
                                                        disabled={index === 0}
                                                        onClick={onClickBack}
                                                        sx={{ mt: 1, mr: 1 }}
                                                    >
                                                        뒤로가기
                                                    </Button>
                                                    <Button
                                                        onClick={onClickReset}
                                                        sx={{ mt: 1, mr: 1 }}
                                                    >
                                                        처음으로
                                                    </Button>
                                                </Box>
                                            </StepContent>
                                        </Step>
                                    )
                                })
                            }
                        </Stepper>
                        <SubmitButton
                            color="primary.main"
                        >
                            신청하기
                        </SubmitButton>
                    </Box>
                </Paper>
            </Container>
        </>
    )
}

export default Apply