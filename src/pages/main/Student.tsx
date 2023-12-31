import React from "react";
import { Container } from "@mui/material";
import { MealPanel, TimetablePanel } from "../../components";

function Student() {
    return (
        <React.Fragment>
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
