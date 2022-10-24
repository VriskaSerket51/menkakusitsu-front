import React, { useEffect } from "react";
import { Container, Paper } from "@mui/material";
import FixedNavbar from "../../components/navbar";
import { TimetablePanel } from "../../components";
import { runAction } from "../../components/lazyload/LazyAction";

function Student() {
    useEffect(() => {
        runAction("test");
    }, []);
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
