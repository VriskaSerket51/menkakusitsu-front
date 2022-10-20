import React from "react";
import { Typography } from "@mui/material";

function PaperTitle(props) {
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
            {props.title}
        </Typography>
    );
}

export default PaperTitle;
