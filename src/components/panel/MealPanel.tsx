import { GetMealResponse } from "@common-jshs/menkakusitsu-lib/v1";
import React from "react";
import { getMeal } from "../../utils/Api";
import dayjs from "dayjs";
import { Box, Divider, Paper, Typography } from "@mui/material";

function MealPanel() {
    const [mealInfo, setMealInfo] = React.useState<GetMealResponse | null>(
        null
    );
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        getMeal(
            { when: dayjs().startOf("day").format("YYYY-MM-DD") },
            (result) => {
                setMealInfo(result);
                setIsLoading(false);
            }
        );
    }, []);

    return (
        <React.Fragment>
            <Box>
                <Paper
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                    }}
                >
                    <Box
                        sx={{
                            display: "block",
                            padding: "50px 30px 30px 30px",
                        }}
                    >
                        <Typography variant="h5">점심</Typography>
                        {mealInfo?.lunch.meals.map((meal) => {
                            return <Typography key={meal} variant="h6">- {meal}</Typography>;
                        })}
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box
                        sx={{
                            display: "block",
                            padding: "50px 30px 30px 30px",
                        }}
                    >
                        <Typography variant="h5">저녁</Typography>
                        {mealInfo?.dinner.meals.map((meal) => {
                            return <Typography key={meal} variant="h6">- {meal}</Typography>;
                        })}
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box
                        sx={{
                            display: "block",
                            padding: "50px 30px 30px 30px",
                        }}
                    >
                        <Typography variant="h5">아침</Typography>
                        {mealInfo?.breakfast.meals.map((meal) => {
                            return <Typography key={meal} variant="h6">- {meal}</Typography>;
                        })}
                    </Box>
                </Paper>
            </Box>
        </React.Fragment>
    );
}

export default MealPanel;
