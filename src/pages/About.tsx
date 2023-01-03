import { Container } from "@mui/material";
import React from "react";
import FixedNavbar from "../components/navbar";

function About() {
    return (
        <React.Fragment>
            <Container
                maxWidth="xl"
                sx={{
                    margin: "30px auto 50px",
                }}
            ></Container>
        </React.Fragment>
    );
}

export default About;
