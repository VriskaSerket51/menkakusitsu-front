import {
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    styled,
    TableBody,
    Typography,
} from "@mui/material";
import React from "react";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

function TimetablePanel() {
    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>1학년 1반</TableCell>
                            <TableCell>1학년 2반</TableCell>
                            <TableCell>2학년 1반</TableCell>
                            <TableCell>2학년 2반</TableCell>
                            <TableCell>3학년 1반</TableCell>
                            <TableCell>3학년 2반</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <TableCell>1교시</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>4</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>6</TableCell>
                            <TableCell>6</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>2교시</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>4</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>6</TableCell>
                            <TableCell>6</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>3교시</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>4</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>6</TableCell>
                            <TableCell>6</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>4교시</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>4</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>6</TableCell>
                            <TableCell>6</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>점심시간</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>4</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>6</TableCell>
                            <TableCell>6</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>5교시</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>4</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>6</TableCell>
                            <TableCell>6</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>6교시</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>4</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>6</TableCell>
                            <TableCell>6</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>7교시</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>4</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>6</TableCell>
                            <TableCell>6</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell>보충</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>4</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell>6</TableCell>
                            <TableCell>6</TableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}

export default TimetablePanel;
