import { Divider, Stack, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import React from "react";
import IconLink from "./IconLink";
import SchoolIcon from "@mui/icons-material/School";
import PolicyIcon from "@mui/icons-material/Policy";

const contributors = [
    { name: "23기 고승한", link: "https://github.com/VriskaSerket51" },
    { name: "23기 선우준", link: "https://github.com/sunsh9876543210" },
];

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
                        newTab
                    />
                    <IconLink
                        href="https://www.instagram.com/jejuscience1999/"
                        icon={<InstagramIcon />}
                        label="제주과학고 공식 인스타그램"
                        newTab
                    />
                    <IconLink
                        href="https://www.instagram.com/jshs_bamboo/"
                        icon={<InstagramIcon />}
                        label="제주과학고 대나무숲"
                        newTab
                    />
                </Stack>
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
                        href="/policy.html"
                        icon={<PolicyIcon />}
                        label="개인정보처리방침"
                        newTab
                    />
                    <Typography>
                        Made by 제주과학고 정보 동아리 COMMON
                    </Typography>
                </Stack>
                <Typography fontSize="0.5rem">
                    {"Contributors: "}
                    {contributors.map((contributor, idx) => {
                        return (
                            <a
                                key={contributor.name}
                                style={{ color: "black" }}
                                href={contributor.link}
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                {`${contributor.name}${
                                    idx == contributors.length - 1 ? "" : ", "
                                }`}
                            </a>
                        );
                    })}
                </Typography>
            </Stack>
            <br />
        </React.Fragment>
    );
}

export default Footer;
