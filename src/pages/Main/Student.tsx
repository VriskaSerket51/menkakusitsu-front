import React from "react";
import { Container } from "@mui/material";
import FixedNavbar from "../../components/navbar";
import { TimetablePanel } from "../../components";

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
                <TimetablePanel />
            </Container>
        </React.Fragment>
    );
}

export default Student;
