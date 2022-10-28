import { BbsComment, BbsPost } from "@common-jshs/menkakusitsu-lib/v1";
import {
    Box,
    Button,
    Container,
    Link,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import FixedNavbar from "../../components/navbar";
import PaperTitle from "../../components/PaperTitle";
import { getBbsCommentList, getBbsPost, postBbsPost } from "../../utils/Api";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate, useParams } from "react-router-dom";
import {
    closeWaitDialog,
    openConfirmDialog,
    openWaitDialog,
    SubmitButton,
} from "../../components";
import { TITLE } from "../../utils/Constant";

function Create() {
    const navigate = useNavigate();

    const onPostBbsPost = useCallback(
        (e: React.MouseEvent<HTMLFormElement>) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const title = data.get("title")?.toString();
            const content = data.get("content")?.toString();
            if (!title || !content) {
                return;
            }
            openWaitDialog(TITLE.Info, "작성 중입니다...");
            postBbsPost({ title: title, content: content }, (result) => {
                closeWaitDialog();
                openConfirmDialog(TITLE.Info, "작성이 완료되었습니다.", () => {
                    navigate("/bbs/post/list");
                });
            });
        },
        []
    );

    return (
        <React.Fragment>
            <FixedNavbar />
            <Container
                maxWidth="md"
                sx={{
                    margin: "30px auto 50px",
                }}
            >
                <Paper>
                    <Box
                        component="form"
                        onSubmit={onPostBbsPost}
                        sx={{ padding: "50px 50px 30px 50px" }}
                    >
                        <PaperTitle>건의 게시글 작성</PaperTitle>
                        <TextField
                            size="small"
                            label="제목"
                            name="title"
                            fullWidth
                            required
                        />
                        <br />
                        <br />
                        <TextField
                            label="본문"
                            name="content"
                            fullWidth
                            multiline
                            rows={20}
                            required
                        />
                        <br />
                        <br />
                        <SubmitButton color="primary.main" width="25%">
                            작성하기
                        </SubmitButton>
                        <br />
                        <Box sx={{ display: "flex", justifyContent: "right" }}>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    navigate("/bbs/post/list");
                                }}
                            >
                                목록
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </React.Fragment>
    );
}

export default Create;
