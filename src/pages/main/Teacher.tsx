import React, { useEffect } from "react";
import { Container } from "@mui/material";
import FixedNavbar from "../../components/navbar";
import {Banner, MealPanel, TimetablePanel } from "../../components";

function Teacher() {
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
                <Banner />
                <br />
            </Container>
        </React.Fragment>
    );
}

export default Teacher;
