import React from "react";
import { Container, Paper } from "@mui/material";
import FixedNavbar from "../../components/navbar";

function Student() {
    return (
        <React.Fragment>
            <FixedNavbar />
            <Container
                maxWidth="xl"
                sx={{
                    margin: "30px auto 50px",
                }}
            >
                <Paper></Paper>
            </Container>
        </React.Fragment>
    );
}

export default Student;
