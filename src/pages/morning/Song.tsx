import {
    Box,
    Container,
    Paper,
} from "@mui/material";
import React, { useState } from "react";
import FixedNavbar from "../../components/navbar";
import PaperTitle from "../../components/PaperTitle";

function Song() {
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
                        <PaperTitle>기상곡 신청</PaperTitle>
                    </Box>
                </Paper>
            </Container>
        </React.Fragment>
    );
}

export default Song;
