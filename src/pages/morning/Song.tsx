import {
    Box,
    Container,
    Divider,
    Paper,
    Stack,
} from "@mui/material";
import { getAutoHeightDuration } from "@mui/material/styles/createTransitions";
import React, { useEffect, useState } from "react";
//import useWindowDimensions from "../../components/basic/viewport";
import FixedNavbar from "../../components/navbar";
import PaperTitle from "../../components/PaperTitle";

//const { heighte, widthe } = useWindowDimensions();

function Song() {
    const [outsiders, setOutsiders] = useState([]); 
    const [width, setWidth]   = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    return (
        <React.Fragment>
            <Container
                maxWidth="lg"
                sx={{
                    margin: "30px auto 50px",
                }}
            >
                <Paper>
                    <Box sx={{ padding: "50px 30px 30px 30px" }}>
                        <PaperTitle>기상곡 신청</PaperTitle>
                    </Box>
                    <Stack 
                        spacing={2} 
                        alignItems="center" 
                        justifyContent="center" 
                        height="1800%" 
                        sx={{ padding: "0px 30px 30px 30px" }}>
                            <iframe
                                src="https://jshs-shimpyo-lldut.run.goorm.site/"
                                style={{
                                    border: 'none',
                                    overflow: 'hidden',
                                    width: '100%',
                                    height: height*(4/5),
                                }}
                                title="example-iframe"
                                />
                    </Stack>
                </Paper>
            </Container>
        </React.Fragment>
    );
}

export default Song;
