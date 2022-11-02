import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function FooterLayout() {
    return (
        <React.Fragment>
            <Box sx={{ minHeight: "100%" }}> 
            <Outlet /></Box>
            <Footer />
        </React.Fragment>
    );
}

export default FooterLayout;