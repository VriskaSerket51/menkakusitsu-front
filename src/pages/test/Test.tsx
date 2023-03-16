import {
    Box,
    Container,
    Paper,
    Typography,
    Stack,
    Grid,
} from "@mui/material";
import React, { useState } from "react";
import FixedNavbar from "../../components/navbar";
import PaperTitle from "../../components/PaperTitle";

function Test() {
    const [outsiders, setOutsiders] = useState([]);
    const testVariable = "this variable is used for the test purpose!"
    const [count, setCount] = useState(0); // 초기값을 0으로 설정

    function handleClick() {
      setCount(count + 1); // count 값을 1씩 증가시킴
    }
  
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
                        <PaperTitle>test page ㅋㅋ</PaperTitle>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={7}>
                        <Box>xs=8</Box>
                        </Grid>
                        <Grid item xs={4}>
                        <Box>xs=4</Box>
                        </Grid>
                    </Grid>
                    <Stack
                        spacing={2} 
                        alignItems="center" 
                        justifyContent="center" 
                        sx={{ padding: "0px 30px 30px 30px" }}>
                        <Typography>
                            {testVariable}
                        </Typography>

                        <div>
                            <p>Count: {count}</p>
                            <button onClick={handleClick}>+1</button>
                        </div>
                    </Stack>
                
                </Paper>
                    
            </Container>
        </React.Fragment>
    );
}

export default Test;
