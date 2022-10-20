import React from "react"
import { Container, Paper } from "@mui/material"
import FixedNavbar from "../../components/navbar"

function Teacher() {
    return (
        <React.Fragment>
            <FixedNavbar />

            <Container maxWidth="xl" sx={{
                margin: '30px auto 50px'
            }}>
                <Paper>
                    여기서 무엇을 보여주어야 할까
                </Paper>
            </Container>
        </React.Fragment>
    );
}

export default Teacher;
