import { Box, Paper } from "@mui/material";
import { NavbarButton, NavbarMenu } from "./NavbarItem";
import Logo from "./Logo";
import React from "react";
import { AccountPanel } from "../panel";

const navbarItems = [
    {
        color: "primary.main",
        title: "특별실",
        menu: [
            {
                title: "특별실 신청",
                href: "/specialroom/apply",
                permission: 1,
            },
            {
                title: "특별실 신청 현황",
                href: "/specialroom/status",
                permission: 1,
            },
            {
                title: "특별실 신청 관리",
                href: "/specialroom/management",
                permission: 2,
            },
        ],
    },
    {
        color: "primary.main",
        title: "유틸리티",
        menu: [
            {
                title: "출석부 다운로드",
                href: "/attendance/info",
                permission: 1,
            },
            {
                title: "이디봇",
                href: "/chat/idbot",
                permission: 1,
            },
        ],
    },
    {
        color: "primary.main",
        title: "도움말",
        href: "/about",
        permission: 1,
    },
];

function FixedNavbar() {
    return (
        <React.Fragment>
            <Box bgcolor="primary.dark" height="16px" />
            <Paper elevation={3}>
                <Box
                    bgcolor="white"
                    height="80px"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        margin: "0px auto",
                    }}
                >
                    <Logo />
                    {navbarItems.map((navbarItem) => {
                        if (navbarItem.menu) {
                            return (
                                <NavbarMenu
                                    key={navbarItem.title}
                                    color={navbarItem.color}
                                    menu={navbarItem.menu}
                                    title={navbarItem.title}
                                />
                            );
                        } else {
                            return (
                                <NavbarButton
                                    key={navbarItem.title}
                                    permission={navbarItem.permission}
                                    href={navbarItem.href}
                                    color={navbarItem.color}
                                    title={navbarItem.title}
                                />
                            );
                        }
                    })}
                    <Box
                        sx={{
                            display: "flex",
                            flex: 1,
                            justifyContent: "flex-end",
                        }}
                    >
                        <Box
                            style={{
                                display: "inline-block",
                                marginRight: "64px",
                            }}
                        >
                            <AccountPanel />
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </React.Fragment>
    );
}

export default FixedNavbar;
