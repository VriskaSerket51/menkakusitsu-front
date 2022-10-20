import { Box, Button } from "@mui/material";
import React from "react";

function SubmitButton({
    color,
    width = "100%",
    children,
    ...rest
}: {
    color: string;
    width?: string;
    children?: React.ReactNode;
    [x: string]: any;
}) {
    return (
        <Box sx={{ textAlign: "center", width: "100%", height: "100%" }}>
            <Button
                {...rest}
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                    backgroundColor: color,
                    "&:hover": {
                        backgroundColor: "#fff",
                        color: color,
                    },
                    fontFamily: "BMDohyeon",
                    height: "58px",
                    width: width,
                }}
            >
                {children}
            </Button>
        </Box>
    );
}

export default SubmitButton;
