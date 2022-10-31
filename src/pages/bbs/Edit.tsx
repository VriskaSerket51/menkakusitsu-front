import { BbsComment, BbsPost } from "@common-jshs/menkakusitsu-lib/v1";
import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    Link,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import FixedNavbar from "../../components/navbar";
import PaperTitle from "../../components/PaperTitle";
import {
    getBbsCommentList,
    getBbsPost,
    getBbsPostHeaders,
    postBbsPost,
    putBbsPost,
} from "../../utils/Api";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate, useParams } from "react-router-dom";
import {
    closeWaitDialog,
    openConfirmDialog,
    openWaitDialog,
    SubmitButton,
} from "../../components";
import { TITLE } from "../../utils/Constant";

function Edit() {
    const params = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState<BbsPost | null>(null);
    const [headers, setHeaders] = useState<string[]>([]);

    useEffect(() => {
        getBbsPost({ id: parseInt(params.postId!) }, (result) => {
            if (!result) {
                navigate("/bbs/post/list");
                return;
            }
            setPost(result.post);
            getBbsPostHeaders({}, (result) => {
                setHeaders(result.headers);
            });
        });
    }, []);

    const onPostBbsPost = useCallback(
        (e: React.MouseEvent<HTMLFormElement>) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const title = data.get("title")?.toString();
            const content = data.get("content")?.toString();
            const header = data.get("header")?.toString();
            if (!title || !content || !header) {
                return;
            }
            openWaitDialog(TITLE.Info, "수정 중입니다...");
            putBbsPost(
                {
                    postId: parseInt(params.postId!),
                    title: title,
                    content: content,
                    header: header,
                },
                (result) => {
                    closeWaitDialog();
                    openConfirmDialog(
                        TITLE.Info,
                        "피드백 수정이 완료되었습니다.",
                        () => {
                            navigate(`/bbs/post/${params.postId}`);
                        }
                    );
                }
            );
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
                        <PaperTitle>피드백 수정</PaperTitle>
                        {post && (
                            <React.Fragment>
                                <Grid
                                    container
                                    spacing={2}
                                    display="flex"
                                    alignItems="center"
                                    flexWrap="wrap"
                                >
                                    <Grid item xs={10}>
                                        <TextField
                                            size="small"
                                            label="제목"
                                            name="title"
                                            fullWidth
                                            required
                                            defaultValue={post.title}
                                            inputProps={{ maxLength: 30 }}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <FormControl size="small" fullWidth>
                                            <InputLabel id="title-header-label">
                                                말머리
                                            </InputLabel>
                                            <Select
                                                labelId="title-header-label"
                                                id="title-header"
                                                label="말머리"
                                                name="header"
                                                required
                                                defaultValue={post.header}
                                            >
                                                {headers.map((header) => {
                                                    return (
                                                        <MenuItem
                                                            key={header}
                                                            value={header}
                                                        >
                                                            {header}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <br />
                                <TextField
                                    label="본문"
                                    name="content"
                                    fullWidth
                                    multiline
                                    rows={20}
                                    required
                                    defaultValue={post.content}
                                    inputProps={{ maxLength: 500 }}
                                />
                            </React.Fragment>
                        )}
                        <br />
                        <br />
                        {post && (
                            <SubmitButton color="primary.main" width="25%">
                                수정하기
                            </SubmitButton>
                        )}
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

export default Edit;
