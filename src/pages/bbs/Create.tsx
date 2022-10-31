import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import FixedNavbar from "../../components/navbar";
import PaperTitle from "../../components/PaperTitle";
import { getBbsPostHeaders, postBbsPost } from "../../utils/Api";
import { useNavigate } from "react-router-dom";
import {
    closeWaitDialog,
    openConfirmDialog,
    openWaitDialog,
    SubmitButton,
} from "../../components";
import { TITLE } from "../../utils/Constant";

function Create() {
    const navigate = useNavigate();
    const [headers, setHeaders] = useState<string[]>([]);

    useEffect(() => {
        getBbsPostHeaders({}, (result) => {
            setHeaders(result.headers);
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
            openWaitDialog(TITLE.Info, "작성 중입니다...");
            postBbsPost(
                { title: title, content: content, header: header },
                (result) => {
                    closeWaitDialog();
                    openConfirmDialog(
                        TITLE.Info,
                        "작성이 완료되었습니다.",
                        () => {
                            navigate("/bbs/post/list");
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
                        <PaperTitle>건의 게시글 작성</PaperTitle>
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <TextField
                                    size="small"
                                    label="제목"
                                    name="title"
                                    fullWidth
                                    required
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
                            inputProps={{ maxLength: 500 }}
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
