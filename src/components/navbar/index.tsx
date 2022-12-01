import {
    Box,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
    Toolbar,
    Typography,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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
            // {
            //     title: "학생활동실 사용 신청",
            //     href: "/",
            //     permission: 1,
            // },
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
        title: "피드백",
        href: "/bbs/feedback/list",
        permission: 1,
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
