import React from "react";
import {
    Box,
    Container,
    Grid,
    Paper,
    TextField,
    Typography
} from "@mui/material";

function Create() {
    return (
        <React.Fragment>
            <Container maxWidth="md" sx={{
                margin: "30px auto 50px"
            }}>
                <Paper
                    elevation={3}
                >
                    <Typography
                        variant="h3"
                        noWrap
                        align="center"
                        sx={{
                            mr: 2,
                            fontWeight: 500,
                            fontFamily: "DesignHouseB",
                            margin: "50px auto 30px",
                        }}
                    >
                        이디저디
                    </Typography>
                    <Box component="form" onSubmit={() => { }} sx={{ mt: 1, padding: "auto" }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} margin="30px">
                                <Typography>
                                    Title
                                </Typography>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="title"
                                    label="ID"
                                    name="title"
                                />
                            </Grid>
                            <Grid item xs={3}>

                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </React.Fragment>
    );
}

export default Create;