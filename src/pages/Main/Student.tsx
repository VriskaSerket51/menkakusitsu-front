import React, { useEffect } from "react";
import { Container } from "@mui/material";
import FixedNavbar from "../../components/navbar";
import { MealPanel, PagePanel, TimetablePanel } from "../../components";

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
                {/* <TimetablePanel /> */}
                {/* <br /> */}
                <MealPanel />
                <br />
            </Container>
        </React.Fragment>
    );
}

export default Student;
