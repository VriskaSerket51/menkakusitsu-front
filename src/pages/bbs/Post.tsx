import { BbsComment, BbsPost } from "@common-jshs/menkakusitsu-lib/v1";
import {
    Box,
    Button,
    Container,
    Divider,
    Pagination,
    Paper,
    TextField,
    Typography,
    Stack,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useCallback, useEffect, useRef, useState } from "react";
import FixedNavbar from "../../components/navbar";
import {
    deleteBbsComment,
    deleteBbsPost,
    getBbsCommentList,
    getBbsPost,
    postBbsComment,
} from "../../utils/Api";
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfo } from "../../utils/Utility";
import {
    closeWaitDialog,
    openConfirmDialog,
    openWaitDialog,
    openYesNoDialog,
} from "../../components";
import { TITLE } from "../../utils/Constant";

function Post() {
    const params = useParams();
    const commentRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();

    const [post, setPost] = useState<BbsPost | null>(null);
    const [commentPage, setCommentPage] = useState(1);
    const [commentCount, setCommentCount] = useState(0);
    const [commentList, setCommentList] = useState<BbsComment[] | null>(null);

    const refresh = useCallback(() => {
        getBbsPost({ id: parseInt(params.postId!) }, (result) => {
            if (!result) {
                navigate("/bbs/post/list");
                return;
            }
            setPost(result.post);
            getBbsCommentList(
                {
                    postId: parseInt(params.postId!),
                    commentPage: commentPage,
                    commentListSize: 20,
                },
                (result) => {
                    setCommentCount(result.commentCount);
                    setCommentList(result.list);
                }
            );
        });
    }, [commentPage]);

    const onPostComment = useCallback(
        (event: React.MouseEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const comment = data.get("comment")?.toString();
            if (!post || !comment) {
                return;
            }
            openWaitDialog(TITLE.Info, "작성 중입니다...");
            postBbsComment({ postId: post.id, content: comment }, (result) => {
                if (commentRef?.current) {
                    commentRef.current.value = "";
                }
                closeWaitDialog();
                openConfirmDialog(TITLE.Info, "작성이 완료되었습니다.", () => {
                    refresh();
                });
            });
        },
        [post, commentRef]
    );

    useEffect(() => {
        refresh();
    }, [refresh]);

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
                        onSubmit={onPostComment}
                        sx={{ padding: "50px 50px 30px 50px" }}
                    >
                        {post && (
                            <Typography variant="h5">{post.title}</Typography>
                        )}
                        {post && (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography>{post.owner.name}</Typography>
                                <Typography>{post.createdDate}</Typography>
                            </Box>
                        )}
                        <Divider />
                        <br />
                        {post && (
                            <Typography sx={{ whiteSpace: "pre-wrap" }}>
                                {post.content}
                            </Typography>
                        )}
                        <br />
                        <Box sx={{ display: "flex", justifyContent: "right" }}>
                            <Stack spacing={2} direction="row">
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        navigate("/bbs/post/list");
                                    }}
                                >
                                    목록
                                </Button>
                                {post &&
                                    (getUserInfo().uid === post.owner.uid ||
                                        getUserInfo().isDev) && (
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => {
                                                openYesNoDialog(
                                                    TITLE.Alert,
                                                    "정말 게시글을 삭제하실 건가요?",
                                                    () => {
                                                        deleteBbsPost(
                                                            { id: post.id },
                                                            (result) => {
                                                                openConfirmDialog(
                                                                    TITLE.Info,
                                                                    "게시글이 삭제되었습니다.",
                                                                    () => {
                                                                        navigate(
                                                                            "/bbs/post/list"
                                                                        );
                                                                    }
                                                                );
                                                            }
                                                        );
                                                    }
                                                );
                                            }}
                                        >
                                            삭제
                                        </Button>
                                    )}
                            </Stack>
                        </Box>
                        <Typography variant="h6">
                            댓글 {commentCount}개
                        </Typography>
                        <Stack spacing={2} direction="row" display="flex">
                            <TextField
                                name="comment"
                                inputRef={commentRef}
                                fullWidth
                                multiline
                                placeholder="댓글"
                            />
                            <Button type="submit" variant="contained">
                                작성
                            </Button>
                        </Stack>
                        <br />
                        <Stack spacing={2}>
                            {commentList &&
                                commentList.map((comment) => (
                                    <Box key={comment.id}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Typography>
                                                {comment.owner.name}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                <Typography>
                                                    {comment.createdDate}
                                                </Typography>
                                                {(getUserInfo().uid ===
                                                    comment.owner.uid ||
                                                    getUserInfo().isDev) && (
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => {
                                                            openYesNoDialog(
                                                                TITLE.Alert,
                                                                "정말 댓글을 삭제하실 건가요?",
                                                                () => {
                                                                    deleteBbsComment(
                                                                        {
                                                                            id: comment.id,
                                                                        },
                                                                        (
                                                                            result
                                                                        ) => {
                                                                            openConfirmDialog(
                                                                                TITLE.Info,
                                                                                "댓글이 삭제되었습니다.",
                                                                                () => {
                                                                                    refresh();
                                                                                }
                                                                            );
                                                                        }
                                                                    );
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        <CloseIcon fontSize="inherit" />
                                                    </IconButton>
                                                )}
                                            </Box>
                                        </Box>
                                        <Divider />
                                        <Typography
                                            sx={{ whiteSpace: "pre-wrap" }}
                                        >
                                            {comment.content}
                                        </Typography>
                                    </Box>
                                ))}
                        </Stack>
                        <br />
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Pagination
                                count={Math.floor(commentCount / 20) + 1}
                                page={commentPage}
                                onChange={(
                                    event: React.ChangeEvent<unknown>,
                                    value: number
                                ) => {
                                    if (commentPage != value) {
                                        setCommentPage(value);
                                    }
                                }}
                                variant="outlined"
                                color="primary"
                            />
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </React.Fragment>
    );
}

export default Post;
