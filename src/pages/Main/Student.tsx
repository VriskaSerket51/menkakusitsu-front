import React from "react"
import {  Container, Paper } from "@mui/material"
import FixedNavbar from "../../components/navbar/FixedNavbar"

function Student() {
    return (
        <>
            <FixedNavbar />
            <Container maxWidth="xl" sx={{
                margin: '30px auto 50px'
            }}>
                <Paper>
                </Paper>
            </Container>
        </>
    )
}

export default Student
