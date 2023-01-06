import { Box, Paper, useMediaQuery } from "@mui/material";
import { NavbarButton, NavbarMenu } from "./NavbarItem";
import Logo from "./Logo";
import React from "react";
import { AccountPanel } from "../panel";
import { Permission } from "../../utils/Utility";

const navbarItems = [
    {
        color: "primary.main",
        title: "특별실",
        menu: [
            {
                title: "특별실 신청",
                href: "/specialroom/apply",
                permission: Permission.Student,
            },
            {
                title: "특별실 신청 현황",
                href: "/specialroom/status",
                permission: Permission.Student,
            },
            {
                title: "특별실 신청 관리",
                href: "/specialroom/management",
                permission: Permission.Teacher,
            },
            {
                title: "학생 외박 관리",
                href: "/specialroom/outer",
                permission: Permission.Teacher,
            },
            // {
            //     title: "학생활동실 사용 신청",
            //     href: "/",
            //     permission: 1,
            // },
            {
                title: "출석부 다운로드",
                href: "/attendance/info",
                permission: Permission.Student,
            },
        ],
    },
    {
        color: "primary.main",
        title: "유틸리티",
        menu: [
            {
                title: "이디봇",
                href: "/chat/idbot",
                permission: Permission.Student,
                newTab: true,
            },
            {
                title: "공학용 계산기",
                href: "/numworks/simulator.html",
                permission: Permission.Student,
                newTab: true,
            },
        ],
    },
    {
        color: "primary.main",
        title: "피드백",
        href: "/bbs/feedback/list",
        permission: Permission.Student,
    },
];

interface NavbarItemsProps {
    isMinWidth: boolean;
}

function NavbarItems(props: NavbarItemsProps) {
    const { isMinWidth } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // if (isMinWidth) {
    return (
        <React.Fragment>
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
                            // newTab={navbarItem.newTab}
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
        </React.Fragment>
    );
    // } else {
    //     return (
    //         <Toolbar>
    //             <IconButton
    //                 color="inherit"
    //                 aria-label="open drawer"
    //                 edge="start"
    //                 onClick={handleDrawerToggle}
    //                 sx={{ mr: 2, display: { sm: "none" } }}
    //             >
    //                 <MenuIcon />
    //             </IconButton>
    //             <Logo />
    //         </Toolbar>
    //     );
    // }
}

function FixedNavbar() {
    const isMinWidth = useMediaQuery("(min-width:900px)");

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
                    <NavbarItems isMinWidth={isMinWidth} />
                </Box>
            </Paper>
        </React.Fragment>
    );
}

export default FixedNavbar;
