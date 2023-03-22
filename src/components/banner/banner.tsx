import React from "react";
import { Box, Divider, Stack } from "@mui/material";
import Banner1 from "../../assets/ebsbanner2023.png";
import Banner2 from "../../assets/water_banner.jpg";
import BannerDetails1 from "../../assets/ebsBanner2023Details.pdf";

import { Link } from "react-router-dom";


export function Banner() {
    const BannerDetails2 = "https://me.go.kr/home/web/board/read.do?menuId=10392&boardMasterId=713&boardId=1584980";
    return (
        <React.Fragment>
            <br />
            <Stack spacing={2} alignItems="center" justifyContent="center">
                <Stack
                    direction="row"
                    divider={
                        <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                        />
                    }
                    spacing={2}
                >
                    <Link
                    to={BannerDetails1} 
                    target="_blank">
                        <img src={Banner1} alt="ebs" height="120vh"/ >
                    </Link>
                    <Link
                    to={BannerDetails2} 
                    target="_blank">
                        <img src={Banner2} alt="worldwatter" height="120vh"/ >
                    </Link>
                </Stack>
            </Stack>
            <br />
        </React.Fragment>
    );
    
}
