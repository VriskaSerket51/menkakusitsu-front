import React, { useEffect, useState } from "react"
import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { apiGET } from "../utils/Utility"
import { useCallback } from "react"

function SpecialroomInfo(props) {
    const { when } = props
    const [info, setInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const updateInfo = useCallback(() => {
        apiGET(when ? `/v1/specialroom/info?when=${when}` : '/v1/specialroom/info')
            .then((resp) => {
                const result = resp.data
                if (result.status >= 0) {
                    setInfo(resp.data.information)
                    setIsLoading(false)
                }
            })
    }, [when])

    useEffect(() => {
        updateInfo()
        const interval = setInterval(updateInfo, 10000)
        return () => clearInterval(interval)
    }, [updateInfo])

    return (
        <div>
            {!isLoading && info ?
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
                            {info.map((row) => (
                                <TableRow
                                    key={row.apply_ID}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    hover={true}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.apply_ID}
                                    </TableCell>
                                    <TableCell>{row.master}</TableCell>
                                    <TableCell>{row.location}</TableCell>
                                    <TableCell>{row.approved_flag === -1 ? row.purpose + " - 거부됨" : row.purpose}</TableCell>
                                    <TableCell>{row.students}</TableCell>
                                    <TableCell>{row.approved_flag === 1 ? "O" : "X"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                :
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>}
        </div>
    )
}

export default SpecialroomInfo