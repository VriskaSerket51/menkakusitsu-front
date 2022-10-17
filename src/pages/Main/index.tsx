import React from "react"
import LoginPanel from "../../components/panel/LoginPanel"
import SpecialroomInfo from "../../components/SpecialroomInfo"
import { Container, Typography, Grid, Link } from "@mui/material"
import { getUserInfo } from "../../utils/Utility"
import Teacher from "./Teacher"
import Student from "./Student"
import MealPanel from "../../components/MealPanel"

function Main() {
    const accessToken = localStorage.getItem('access-token')

    if (accessToken) {
        const userInfo = getUserInfo()
        if (userInfo.isTeacher === 1) {
            return <Teacher />
        } else {
            return <Student />
        }
    }

    return (
        <>
            <Typography
                variant="h3"
                noWrap
                align="center"
                sx={{
                    mr: 2,
                    fontWeight: 500,
                    fontFamily: 'DesignHouseB',
                    margin: '50px auto 30px',
                }}
            >
                <Link href="/" underline="none" color='#279023'>{import.meta.env.VITE_WEB_TITLE}</Link>
            </Typography>
            <Container maxWidth="xl" sx={{
                margin: '30px auto 50px'
            }}>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <SpecialroomInfo />
                    </Grid>
                    <Grid item xs={4}>
                        <LoginPanel />
                        <MealPanel />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Main
