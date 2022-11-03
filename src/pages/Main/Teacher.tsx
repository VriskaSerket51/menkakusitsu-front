import React from "react";
import { Container, Paper } from "@mui/material";
import FixedNavbar from "../../components/navbar";
import { MealPanel, TimetablePanel } from "../../components/panel";

function Teacher() {
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

export default Teacher;
