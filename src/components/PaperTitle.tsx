import React from "react";
import { Typography } from "@mui/material";

function PaperTitle({ children }: { children: React.ReactNode }) {
    return (
        <Typography
            sx={{
                fontSize: "60px",
                fontFamily: "BMDoHyeon",
                textAlign: "center",
                color: "primary.light",
                marginBottom: "20px",
            }}
        >
            {children}
        </Typography>
    );
}

export default PaperTitle;
