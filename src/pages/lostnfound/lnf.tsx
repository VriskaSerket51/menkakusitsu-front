import {
    Box,
    Container,
    Paper,
} from "@mui/material";
import React, { useState } from "react";
import FixedNavbar from "../../components/navbar";
import PaperTitle from "../../components/PaperTitle";

function LostNFound() {
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
                        <PaperTitle>분실물</PaperTitle>
                    </Box>
                </Paper>
                기능추가예정입니다.
            </Container>
        </React.Fragment>
    );
}

export default LostNFound;
