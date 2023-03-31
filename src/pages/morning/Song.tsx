import {
    Box,
    Container,
    Divider,
    Paper,
    Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
//import useWindowDimensions from "../../components/basic/viewport";
//import FixedNavbar from "../../components/navbar";
import PaperTitle from "../../components/PaperTitle";


//const { heighte, widthe } = useWindowDimensions();

function Song(this: any) {
    const [outsiders, setOutsiders] = useState([]); 
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
                            기능추가예정입니다.
                            <iframe
                                src="https://jshs-shimpyo-lldut.run.goorm.site/"
                                style={{
                                    border: 'none',
                                    overflow: 'hidden',
                                    width: '100%',
                                    height: '100vh'
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
