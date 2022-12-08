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
import React, { useCallback, useEffect, useState } from "react";
import FixedNavbar from "../../components/navbar";
import PaperTitle from "../../components/PaperTitle";
import { getBbsPostList } from "../../utils/Api";
import ArticleIcon from "@mui/icons-material/Article";
import CampaignIcon from "@mui/icons-material/Campaign";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate, useParams } from "react-router-dom";

interface ArticleProps {
    post: BbsPost;
    isNotice?: boolean;
}

function Article(props: ArticleProps) {
    const navigate = useNavigate();

    const post = props.post;
    return (
        <Button
            onClick={() => {
                navigate(`/bbs/${post.board}/${post.id}`);
            }}
            sx={{ justifyContent: "space-between" }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    float: "left",
                    color: props.isNotice ? "#FF4E59" : "primary.main",
                }}
            >
                {props.isNotice ? (
                    <CampaignIcon />
                ) : post.isPublic ? (
                    <ArticleIcon />
                ) : (
                    <LockIcon />
                )}
                {post.header} {post.title} [{post.commentCount}]
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    float: "right",
                    color: "gray",
                }}
            >
                {post.owner.name}
            </Box>
        </Button>
    );
}

function List() {
    const [page, setPage] = useState(1);
    const [postCount, setPostCount] = useState(0);
    const [postList, setPostList] = useState<BbsPost[] | null>(null);

    const params = useParams();
    const navigate = useNavigate();

    const board = params.board!;

    useEffect(() => {
        getBbsPostList(
            { board: board, postPage: page, postListSize: 20 },
            (result) => {
                setPostCount(result.postCount);
                setPostList(result.list);
            }
        );
    }, [page]);

    const drawBbsPostList = useCallback(() => {
        if (postList !== null && postList.length > 0) {
            return postList.map((post) => {
                return (
                    <Article
                        key={post.id}
                        post={post}
                        isNotice={post.postType === 0}
                    />
                );
            });
        } else {
            return <Typography>게시글이 없습니다.</Typography>;
        }
    }, [postList]);

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
                        <PaperTitle>피드백</PaperTitle>
                        <Stack spacing={2}>{drawBbsPostList()}</Stack>
                        <br />
                        <Box sx={{ display: "flex", justifyContent: "right" }}>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    navigate(`/bbs/${board}/create`);
                                }}
                            >
                                피드백하기
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
