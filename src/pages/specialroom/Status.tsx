import React from "react";
import {
    Box,
    CircularProgress,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Step,
    Stepper,
    Typography,
    StepConnector,
    stepConnectorClasses,
    StepLabel,
    StepIconProps
} from "@mui/material";
import SpecialroomInfo from "../../components/SpecialroomInfo";
import { getSpecialroomApplyStatus } from "../../utils/Api";
import FixedNavbar from "../../components/navbar";
import PaperTitle from "../../components/PaperTitle";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useCallback } from "react";
import SubmitButton from "../../components/SubmitButton";
import { apiDELETE } from "../../utils/Utility";
import { TITLE } from "../../utils/Constant";
import { openConfirmDialog, openYesNoDialog, closeWaitDialog, openWaitDialog } from "../../components/popup";

const ColorlibConnector = styled(StepConnector)<{ isApproved: number }>(({ theme, isApproved }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 27,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: `${isApproved >= 0 ? theme.palette.success.light : theme.palette.error.light}`,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: `${isApproved >= 0 ? theme.palette.success.light : theme.palette.error.light}`,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 10,
        border: 0,
        backgroundColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled("div")<{ ownerState: { completed?: boolean, active?: boolean }, isApproved: number }>(({ theme, ownerState, isApproved }) => {
    return ({
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
        zIndex: 1,
        color: "#fff",
        width: 64,
        height: 64,
        display: "flex",
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
        ...(ownerState.active && {
            backgroundColor: `${isApproved >= 0 ? theme.palette.success.light : theme.palette.error.light}`,
            boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
        }),
        ...(ownerState.completed && {
            backgroundColor: `${isApproved >= 0 ? theme.palette.success.light : theme.palette.error.light}`,
            boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
        }),
    });
});

interface ColorlibStepIconProps extends StepIconProps {
    isApproved: number
}

function ColorlibStepIcon(props: ColorlibStepIconProps) {
    const { active, completed, className, isApproved } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <GroupAddIcon />,
        2: <HourglassTopIcon />,
        3: <CheckCircleIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className} isApproved={isApproved}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const steps = ["신청 완료", "승인 대기 중", "승인 완료"];

interface ApplyStatus {
    apply_ID: number,
    location: string,
    purpose: string,
    teacher: string,
    master: string,
    applicants: string,
    when: number,
    approved_flag: number
}

function Status() {
    const [applyStatus, setApplyStatus] = React.useState<ApplyStatus | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const [when, setWhen] = React.useState(1);

    const refresh = useCallback(() => {
        setIsLoading(true);
        getSpecialroomApplyStatus(when, (resp) => {
            const result = resp.data;
            if (result.status >= 0) {
                setApplyStatus(result.applyStatus);
                setIsLoading(false);
            }
        });
    }, [when]);

    const onCancelApply = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        openYesNoDialog(TITLE.Info, "정말 특별실 신청을 취소하시겠습니까?", () => {
            openWaitDialog(TITLE.Info, "특별실 신청을 취소 중입니다...");
            apiDELETE("/v1/specialroom/apply", {})
                .then((resp) => {
                    const result = resp.data;
                    if (result.status >= 0) {
                        closeWaitDialog();
                        openConfirmDialog(TITLE.Info, "특별실 신청 취소에 성공했습니다.", () => {
                            refresh();
                        });
                    }
                });
        }, () => { });
    };

    React.useEffect(() => {
        refresh();
    }, [refresh]);

    let activeStep = -1;

    if (applyStatus?.approved_flag === 0) {
        activeStep = 1;
    }
    else if (applyStatus?.approved_flag === 1) {
        activeStep = 2;
    }
    else if (applyStatus?.approved_flag === -1) {
        activeStep = 2;
    }

    const stepIconProps: ColorlibStepIconProps = {
        icon: "1",
        isApproved: applyStatus ? applyStatus.approved_flag : 0
    };

    return (
        <>
            <FixedNavbar />
            <Container maxWidth="md" sx={{
                margin: "30px auto 50px"
            }}>
                <Paper>
                    <Box component="form" sx={{ padding: "50px 30px 30px 30px" }}>
                        <PaperTitle title="특별실 신청 현황" />
                        <Box sx={{ padding: "30px 90px 30px" }}>
                            <Typography
                                variant="h5"
                            >
                                몇 차 면학으로 신청하셨나요?
                            </Typography>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="select-when">사용 시간</InputLabel>
                                <Select
                                    labelId="select-when"
                                    id="select-when"
                                    value={when}
                                    label="사용 시간"
                                    onChange={(event) => {
                                        setWhen(Number(event.target.value));
                                    }}
                                >
                                    <MenuItem value={1}>1차 면학</MenuItem>
                                    <MenuItem value={2}>2차 면학</MenuItem>
                                </Select>
                            </FormControl>
                            {
                                !isLoading ?
                                    <Box sx={{ padding: "16px 12px 0px" }}>
                                        {
                                            applyStatus ?
                                                <Typography
                                                    noWrap
                                                    variant="h6"
                                                    sx={{
                                                        mr: 2,
                                                        color: "inherit",
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    선생님: {applyStatus.teacher}
                                                    <br />
                                                    신청자: {applyStatus.master}
                                                    <br />
                                                    장소: {applyStatus.location}
                                                    <br />
                                                    목적: {applyStatus.purpose} {applyStatus.approved_flag === -1 && " - 거부됨"}
                                                    <br />
                                                    명단: {applyStatus.applicants} - 총 {applyStatus.applicants.split(",").length}인
                                                    <br />
                                                    활동 시간: {applyStatus.when}차 면학
                                                </Typography>
                                                :
                                                <Typography
                                                    noWrap
                                                    sx={{
                                                        mr: 2,
                                                        color: "inherit",
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    신청 안 함
                                                </Typography>
                                        }
                                    </Box>
                                    :
                                    <Box sx={{ textAlign: "center" }}>
                                        <CircularProgress />
                                    </Box>
                            }
                        </Box>
                        <Stack sx={{ width: "100%", paddingBottom: "32px" }} spacing={4}>
                            <Stepper alternativeLabel activeStep={isLoading ? -1 : activeStep} connector={<ColorlibConnector isApproved={applyStatus ? applyStatus.approved_flag : 0} />}>
                                {
                                    steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel StepIconComponent={ColorlibStepIcon} StepIconProps={stepIconProps}>{label}</StepLabel>
                                        </Step>
                                    ))
                                }
                            </Stepper>
                            {
                                !isLoading && applyStatus &&
                                <SubmitButton width="25%" color="error.main" onClick={onCancelApply}>
                                    신청 취소
                                </SubmitButton>
                            }
                        </Stack>
                        <SpecialroomInfo />
                    </Box>
                </Paper>
            </Container>
        </>
    )
};

export default Status;