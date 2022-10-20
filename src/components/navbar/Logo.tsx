import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Link } from "@mui/material";

function Logo() {
    return (
            <Box
                style={{
                    display: "inline-block",
                    marginLeft: "64px",
                }}
            >
                <Link href="/" color="inherit" underline="none">
                    <Typography
                        sx={{ fontFamily: "DesignHouseB", fontSize: "32px" }}
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
