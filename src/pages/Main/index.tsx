import React, { useEffect } from "react";
import { SpecialroomInfoPanel, MealPanel, LoginPanel } from "../../components";
import { Container, Typography, Grid, Link } from "@mui/material";
import { getUserInfo } from "../../utils/Utility";
import Teacher from "./Teacher";
import Student from "./Student";
import {
    setFooterActive,
    setHeaderActive,
} from "../../components/router/RouteWrapper";

function Main() {
    const accessToken = localStorage.getItem("access-token");

    if (accessToken) {
        const userInfo = getUserInfo();
        if (userInfo.isTeacher) {
            return <Teacher />;
        } else {
            return <Student />;
        }
    }

    useEffect(() => {
        setHeaderActive(false);
        return () => {
            setHeaderActive(true);
        };
    }, []);

    return (
        <React.Fragment>
            <Typography
                variant="h3"
                noWrap
                align="center"
                sx={{
                    mr: 2,
                    fontWeight: 500,
                    fontFamily: "DesignHouseB",
                    margin: "50px auto 30px",
                }}
            >
                <Link href="/" underline="none" color="primary.main">
                    {import.meta.env.VITE_WEB_TITLE}
                </Link>
            </Typography>
            <Container
                maxWidth="xl"
                sx={{
                    margin: "30px auto 50px",
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={8.5}>
                        <SpecialroomInfoPanel />
                    </Grid>
                    <Grid item xs={3.5}>
                        <LoginPanel />
                    </Grid>
                    <Grid item xs={12}>
                        <MealPanel />
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default Main;
