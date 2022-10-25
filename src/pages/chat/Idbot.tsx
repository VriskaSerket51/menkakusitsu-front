// import { Box, Divider, Paper, Typography } from "@mui/material";
// import axios from "axios";
// import { ChatController, MuiChat } from "chat-ui-react";
// import MetaTag from "../../components/MetaTag"
// import React from "react";
// import "../../styles/ChatStyle.css";
import Construct from "../Construct";

// const BOT_NAME = "이디봇";

function Idbot() {
    return <Construct />;
    /* const [chatCtl] = React.useState(
        new ChatController({
            showDateTime: true,
        }))

    React.useMemo(async () => {
        const addBotMessage = async (content) => {
            await chatCtl.addMessage({
                type: "jsx",
                content: <div dangerouslySetInnerHTML={{ __html: content }}></div>,
                self: false,
                avatar: "/logo.png",
                username: BOT_NAME,
            })
        }
        // Chat content is displayed using ChatController
        await addBotMessage(`안녕하세요! ${BOT_NAME}이에요. 저는 다음과 같은 기능을 할 수 있어요. 다음 예시문장으로 제 기능을 테스트 해 보세요!<br>
        - 과목별 교사 확인: 물리학 과목 선생님은 누가 있어?<br>
        - 급식표: 오늘 급식 알려줘<br>
        - 학사일정: 학사일정 알려줘<br>
        - 생활지도 교사 확인: 생활지도쌤 누구야?<br>
        - 상수표: 상수표 보여줘<br>
        - 그 외: 조졸조진 어떻게 해?/점심시간은 몇시야?/특별실 어떻게 써?/학활실 이디저디에서 써도 돼?`)
        chatCtl.setActionRequest(
            { type: "text", always: true, addMessage: false, placeholder: "메시지를 입력해 주세요." },
            (response) => {
                // console.log({
                // chat_input: response.value
                // })
                chatCtl.addMessage({
                    type: "text",
                    content: response.value,
                    self: true,
                    avatar: "https://cdn-icons-png.flaticon.com/512/1177/1177594.png",
                    username: "나",
                });
                axios.get(`https://api.이디저디.com/v1/idbot?chat_input=${response.value}`)
                    .then((res) => {
                        // console.log(res.data)
                        addBotMessage(res.data.chat_output)
                    })
            }
        )
    }, [chatCtl])

    // Only one component used for display
    return (
        <>
            {/* <MetaTag title="이디봇과 소통해요!"/> }
            <Box sx={{ height: "100%", backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
                <Paper
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        maxWidth: "640px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        bgcolor: "background.default",
                    }}
                    elevation={3}
                >
                    <Typography sx={{ p: 1, textAlign: "center" }}>
                        {BOT_NAME}과 소통해요 :D
                    </Typography>
                    <Divider />
                    <Box sx={{ flex: "1 1 0%", minHeight: 0 }}>
                        <MuiChat chatController={chatCtl} />
                    </Box>
                </Paper>
            </Box>
        </>)*/
}

export default Idbot;
