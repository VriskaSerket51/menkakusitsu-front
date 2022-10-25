// import { Box, Divider, Paper, Typography } from "@mui/material";
// import { ChatController, MuiChat } from "chat-ui-react";
// import React from "react";
// import io from "socket.io-client";
// import "../../styles/ChatStyle.css";
import Construct from "../Construct";

function RandomChat() {
    return <Construct />;
    /*const [chatCtl] = React.useState(
        new ChatController({
            showDateTime: true,
        }))

    React.useMemo(async () => {
        const socketClient = io("https://test.이디저디.com:4000", { cors: { origin: '*' } })
        let userInfo

        socketClient.on("connect", () => {
            socketClient.emit("handshake", "random-chat")
        })

        socketClient.on("handshake", (data) => {
            userInfo = data
        })

        socketClient.on("random-chat-received", (message) => {
            addChat(false, message.name, message.content, message.avatar)
        })

        const addChat = async (self, name, content, avatar) => {
            chatCtl.addMessage({
                type: 'text',
                content: content,
                self: self,
                avatar: avatar,
                username: name,
            })
        }

        // Chat content is displayed using ChatController
        chatCtl.setActionRequest(
            { type: 'text', always: true, addMessage: false, placeholder: '메시지를 입력해 주세요.' },
            (response) => {
                addChat(true, userInfo.name, response.value, '-')
                const message = {}
                message.name = userInfo.name
                message.content = response.value
                message.avatar = '-'
                socketClient.emit("random-chat-send", message)
            }
        )
    }, [chatCtl])

    // Only one component used for display
    return (
        <>
            <Box sx={{ height: '100%', backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        maxWidth: '640px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        bgcolor: 'background.default',
                    }}
                    elevation={3}
                >
                    <Typography sx={{ p: 1, textAlign: 'center' }}>
                        Random Chatting
                    </Typography>
                    <Divider />
                    <Box sx={{ flex: '1 1 0%', minHeight: 0 }}>
                        <MuiChat chatController={chatCtl} />
                    </Box>
                </Paper>
            </Box>
        </>)*/
}

export default RandomChat;
