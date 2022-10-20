import {
    Box,
    CircularProgress,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    Paper,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { getParameter } from "../../utils/Utility";
import { SpecialroomInfoPanel } from "../../components/panel";
import { getAttendanceList } from "../../utils/Api";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const parseAttendanceList = (list: string[][]) => {
    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableBody>
                        {list.map((row, i) => {
                            return (
                                <StyledTableRow key={i}>
                                    {row.map((col, j) => {
                                        if (col === "|") {
                                            return (
                                                <TableCell
                                                    key={`${i}_${j}`}
                                                ></TableCell>
                                            );
                                        } else {
                                            return (
                                                <TableCell
                                                    key={`${i}_${j}`}
                                                    align="center"
                                                >
                                                    {col}
                                                </TableCell>
                                            );
                                        }
                                    })}
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
};

function Download() {
    const [attendanceInfo, setAttendanceInfo] = useState<{
        big: string[][];
        small: string[][];
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const when = parseInt(getParameter("when", "1"));

    useEffect(() => {
        console.log(new Date());
        getAttendanceList({ when: when }, (result) => {
            setAttendanceInfo(result.list);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        if (!isLoading) {
            window.print();
        }
    }, [isLoading]);

    const today = new Date();

    return (
        <React.Fragment>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "white",
                    textAlign: "center",
                }}
            >
                <Typography
                    sx={{
                        paddingTop: "30px",
                        fontSize: "32px",
                        fontWeight: 200,
                    }}
                >
                    {today.getFullYear()}년 {today.getMonth() + 1}월{" "}
                    {today.getDate()}일 {when}차 면학 출석부
                </Typography>
                <Box sx={{ paddingBottom: "192px" }}>
                    <Typography
                        sx={{
                            fontSize: "24px",
                            fontWeight: 50,
                        }}
                    >
                        1~2학년 면학실(3학년은 2페이지에)
                    </Typography>
                    {attendanceInfo && parseAttendanceList(attendanceInfo.big)}
                </Box>
                <Box sx={{ paddingBottom: "64px" }}>
                    <Typography
                        sx={{
                            fontSize: "24px",
                            fontWeight: 50,
                        }}
                    >
                        3학년 면학실
                    </Typography>
                    {attendanceInfo &&
                        parseAttendanceList(attendanceInfo.small)}
                </Box>
                <Box>
                    <Typography
                        sx={{
                            fontSize: "24px",
                            fontWeight: 50,
                        }}
                    >
                        특별실 신청 현황
                    </Typography>
                    <SpecialroomInfoPanel
                        filter={(specialroomInfo) =>
                            specialroomInfo.when === when
                        }
                    />
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default Download;
