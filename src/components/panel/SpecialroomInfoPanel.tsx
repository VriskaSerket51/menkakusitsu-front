import React, { useEffect, useState } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useCallback } from "react";
import { getSpecialroomInfo } from "../../utils/Api";
import { v1 } from "@common-jshs/menkakusitsu-lib";

export const drawInfoTable = (
    information: v1.SpecialroomInfo[] | null,
    isLoading: boolean,
    filter?: (specialroomInfo: v1.SpecialroomInfo) => boolean
) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="특별실 신청 명단">
                <TableHead>
                    <TableRow>
                        <TableCell>번호</TableCell>
                        <TableCell>신청자</TableCell>
                        <TableCell>장소</TableCell>
                        <TableCell>목적</TableCell>
                        <TableCell>명단</TableCell>
                        <TableCell>승인</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!isLoading &&
                        information &&
                        information.map((row) => {
                            if (!filter || filter(row)) {
                                return (
                                    <TableRow
                                        key={row.applyId}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    border: 0,
                                                },
                                        }}
                                        hover={true}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.applyId}
                                        </TableCell>
                                        <TableCell>{row.master.name}</TableCell>
                                        <TableCell>{row.location}</TableCell>
                                        <TableCell>
                                            {row.state === -1
                                                ? row.purpose + " - 거부됨"
                                                : row.purpose}
                                        </TableCell>
                                        <TableCell>{row.applicants}</TableCell>
                                        <TableCell>
                                            {row.state === 1 ? "O" : "X"}
                                        </TableCell>
                                    </TableRow>
                                );
                            } else {
                                return <React.Fragment></React.Fragment>;
                            }
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

function SpecialroomInfoPanel({
    filter,
}: {
    filter?: (specialroomInfo: v1.SpecialroomInfo) => boolean;
}) {
    const [information, setInformation] = useState<v1.SpecialroomInfo[] | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(true);

    const updateInformation = useCallback(() => {
        getSpecialroomInfo({}, (result) => {
            setInformation(result.information);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        updateInformation();
        const interval = setInterval(updateInformation, 10000);
        return () => clearInterval(interval);
    }, [updateInformation]);

    return drawInfoTable(information, isLoading, filter);
}

export default SpecialroomInfoPanel;
