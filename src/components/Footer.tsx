import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import React from "react";
import IconLink from "./IconLink";
import SchoolIcon from "@mui/icons-material/School";

function Footer() {
    return (
        <React.Fragment>
            <br />
            <Divider variant="middle" />
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
                    <IconLink
                        href="http://jeju-s.jje.hs.kr/jeju-s"
                        icon={<SchoolIcon />}
                        label="제주과학고 공식 홈페이지"
                    />
                    <IconLink
                        href="https://www.instagram.com/jejuscience1999/"
                        icon={<InstagramIcon />}
                        label="제주과학고 공식 인스타그램"
                    />
                    <IconLink
                        href="https://www.instagram.com/jshs_bamboo/"
                        icon={<InstagramIcon />}
                        label="제주과학고 대나무숲"
                    />
                </Stack>
                <Typography>Made by 제주과학고 정보 동아리 COMMON</Typography>
                <Typography fontSize="0.5rem">Contributors: 23기 고승한, 23기 선우준, 23기 박도현</Typography>
            </Stack>
            <br />
        </React.Fragment>
    );
}

export default Footer;
