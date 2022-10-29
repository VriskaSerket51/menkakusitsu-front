import { BbsPost } from "@common-jshs/menkakusitsu-lib/v1";
import {
    Box,
    Button,
    Container,
    Link,
    Pagination,
    Paper,
    Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import FixedNavbar from "../../components/navbar";
import PaperTitle from "../../components/PaperTitle";
import { getBbsPostList } from "../../utils/Api";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate } from "react-router-dom";

interface ArticleProps {
    post: BbsPost;
}

function Article(props: ArticleProps) {
    const navigate = useNavigate();

    const post = props.post;
    return (
        <Button
            onClick={() => {
                navigate(`/bbs/post/${post.id}`);
            }}
            sx={{ justifyContent: "space-between" }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    float: "left",
                }}
            >
                <ArticleIcon />
                {post.title} [{post.commentCount}] - {post.owner.name}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    float: "right",
                }}
            >
                {post.createdDate}
            </Box>
        </Button>
    );
}

function List() {
    const [page, setPage] = useState(1);
    const [postCount, setPostCount] = useState(0);
    const [postList, setPostList] = useState<BbsPost[] | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        getBbsPostList({ postPage: page, postListSize: 20 }, (result) => {
            setPostCount(result.postCount);
            setPostList(result.list);
        });
    }, [page]);

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
                    <Box sx={{ padding: "50px 50px 30px 50px" }}>
                        <PaperTitle>건의 게시판</PaperTitle>
                        <Stack spacing={2}>
                            {postList !== null && postList.length > 0 ? (
                                postList.map((post) => {
                                    return (
                                        <Article key={post.id} post={post} />
                                    );
                                })
                            ) : (
                                <Typography>게시글이 없습니다.</Typography>
                            )}
                        </Stack>
                        <br />
                        <Box sx={{ display: "flex", justifyContent: "right" }}>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    navigate("/bbs/post/create");
                                }}
                            >
                                글쓰기
                            </Button>
                        </Box>
                        <br />
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Pagination
                                count={Math.floor(postCount / 20) + 1}
                                page={page}
                                onChange={(
                                    event: React.ChangeEvent<unknown>,
                                    value: number
                                ) => {
                                    if (page != value) {
                                        setPage(value);
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

export default List;
