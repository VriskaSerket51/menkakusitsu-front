import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Logo() {
    const navigate = useNavigate();

    return (
        <Box
            style={{
                display: "inline-block",
                marginLeft: "64px",
            }}
        >
            <Link
                color="inherit"
                underline="none"
                onClick={() => {
                    navigate("/");
                }}
                sx={{cursor: "pointer"}}
            >
                <Typography
                    sx={{ fontFamily: "DesignHouseB" }}
                    variant="h4"
                    color="primary.main"
                >
                    {import.meta.env.VITE_WEB_TITLE}
                </Typography>
                <Box
                    sx={{
                        marginTop: "-10px",
                        backgroundColor: "primary.light",
                        height: "4px",
                        borderRadius: "10px",
                    }}
                />
            </Link>
        </Box>
    );
}

export default Logo;
