import { BbsComment, BbsPost } from "@common-jshs/menkakusitsu-lib/v1";
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
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
import { getBbsPost, getBbsPostHeaders, putBbsPost } from "../../utils/Api";
import { useNavigate, useParams } from "react-router-dom";
import {
    closeWaitDialog,
    openConfirmDialog,
    openWaitDialog,
    SubmitButton,
} from "../../components";
import { DialogTitle } from "../../utils/Constant";

function Edit() {
    const params = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState<BbsPost | null>(null);
    const [headers, setHeaders] = useState<string[]>([]);

    const board = params.board!;
    const postId = parseInt(params.postId!);

    useEffect(() => {
        getBbsPost({ board: board, postId: postId }, (result) => {
            if (!result) {
                navigate(`/bbs/${board}/list`);
                return;
            }
            setPost(result.post);
            getBbsPostHeaders({ board: board }, (result) => {
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
            const isPublic = data.get("isPrivate")?.toString() != "on";
            if (!title || !content || !header) {
                return;
            }
            openWaitDialog(DialogTitle.Info, "수정 중입니다...");
            putBbsPost(
                {
                    postId: parseInt(params.postId!),
                    board: params.board!,
                    title: title,
                    content: content,
                    header: header,
                    isPublic: isPublic,
                },
                (result) => {
                    closeWaitDialog();
                    openConfirmDialog(
                        DialogTitle.Info,
                        "피드백 수정이 완료되었습니다.",
                        () => {
                            navigate(`/bbs/${board}/${params.postId}`);
                        }
                    );
                }
            );
        },
        []
    );

    return (
        <React.Fragment>
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
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                defaultChecked={!post.isPublic}
                                            />
                                        }
                                        label="비공개 피드백 작성"
                                        name="isPrivate"
                                    />
                                </FormGroup>
                            </React.Fragment>
                        )}
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
                                    navigate(`/bbs/${board}/list`);
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
