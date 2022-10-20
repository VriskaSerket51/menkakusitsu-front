// import { Box, createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import React from "react";
// import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
// import qr from "../assets/QR.png";
// import { redirecToHome } from "../utils/Utility";

function NotFound() {
    return <Navigate to="/" />;

    /*const [percentage, setPercentage] = useState(0);

    const theme = createTheme({
        typography: {
            fontFamily: "맑은 고딕"
        },
        palette: {
            background: {
                default: "#3973aa"
            }
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            let tempPercentage = percentage + parseInt(Math.random() * 10);
            if (tempPercentage > 100) {
                tempPercentage = 100;
                redirecToHome();
            }
            setPercentage(tempPercentage);
        }, 1000);
        return () => clearInterval(interval)
    }, [percentage]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box
                    sx={{
                        display: "table",
                        height: "100%",
                        margin: "0 auto",
                        marginTop: "-10px",
                        width: "70%",
                        fontSize: "1.9vw",
                    }}
                >
                    <Box
                        sx={{
                            display: "table-cell",
                            verticalAlign: "middle",
                        }}
                    >
                        <Typography
                            sx={{
                                // fontWeight: "normal",
                                padding: 0,
                                margin: "25px 0",
                                marginTop: 0,
                                fontWeight: 300,
                                fontSize: "6.5em",
                                marginBottom: "10px",
                                color: "#fefeff",
                            }}
                            variant="h1"
                        >
                            :(
                        </Typography>
                        <Typography
                            sx={{
                                // fontWeight: "normal",
                                padding: 0,
                                margin: "25px 0",
                                marginTop: 0,
                                fontWeight: 300,
                                fontSize: "1.5em",
                                color: "#fefeff",
                            }}
                            variant="h2"
                        >
                            페이지를 찾을 수 없습니다. 몇 초 뒤 홈으로 돌아갑니다.
                        </Typography>
                        <Typography
                            sx={{
                                // fontWeight: "normal",
                                padding: 0,
                                margin: "25px 0",
                                marginTop: 0,
                                fontWeight: 300,
                                fontSize: "1.5em",
                                color: "#fefeff",
                            }}
                            variant="h2"
                        >
                            {percentage}% 완료
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexFlow: "row",
                                flexWrap: "nowrap",
                                paddingTop: "10px",
                            }}
                        >
                            <Box
                                sx={{
                                    flex: "0 1 auto",
                                }}
                            >
                                <Box
                                    sx={{
                                        background: "white",
                                        padding: "5px",
                                        lineHeight: 0,
                                    }}
                                >
                                    <img src={qr} alt="QR Code" height={100} />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    paddingLeft: "10px",
                                    flex: "1 1 auto",
                                }}
                            >
                                <Typography
                                    sx={{
                                        // fontWeight: "normal",
                                        padding: 0,
                                        margin: "25px 0",
                                        marginTop: 0,
                                        fontWeight: 300,
                                        fontSize: "0.9em",
                                        lineHeight: "1.5em",
                                        color: "#fefeff",
                                    }}
                                    variant="h4"
                                >
                                    이 문제와 가능한 수정 사항에 대한 자세한 내용은 다음을 참조하세요.
                                    <br />
                                    https://test.이디저디.com/about#404
                                </Typography>
                                <Typography
                                    sx={{
                                        // fontWeight: "normal",
                                        padding: 0,
                                        margin: "25px 0",
                                        marginTop: 0,
                                        fontWeight: 300,
                                        fontSize: "0.9em",
                                        lineHeight: "1.1em",
                                        color: "#fefeff",
                                    }}
                                    variant="h5"
                                >
                                    지원 담당자에게 연락하는 경우 다음 정보를 제공하세요
                                    <br />
                                    Error Code: 404 PAGE NOT FOUND
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </ThemeProvider>
        </>
    );*/
}

export default NotFound;
