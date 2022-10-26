import { GetMealResponse } from "@common-jshs/menkakusitsu-lib/v1";
import React from "react";
import { getMeal } from "../../utils/Api";
import dayjs from "dayjs";
import { Box, Divider, Paper, SxProps, Theme, Typography } from "@mui/material";

interface MealInfoProps {
    type: "breakfast" | "lunch" | "dinner";
    meals?: string[];
}

const MealInfo = (props: MealInfoProps) => {
    const currentHour = dayjs().hour();
    let mealName: string = "";
    let highlitedMeal: boolean = false;
    switch (props.type) {
        case "breakfast":
            mealName = "아침";
            highlitedMeal = currentHour >= 19;
            break;
        case "lunch":
            mealName = "점심";
            highlitedMeal = currentHour >= 13 && currentHour < 19;
            break;
        case "dinner":
            mealName = "저녁";
            highlitedMeal = currentHour < 13;
            break;
    }
    const sx: SxProps<Theme> = highlitedMeal
        ? {
              display: "block",
              padding: "34px 30px 30px 30px",
              borderRadius: "1px",
              borderStyle: "solid none none none",
              borderColor: "primary.main",
              borderWidth: "8px",
          }
        : {
              display: "block",
              padding: "50px 30px 30px 30px",
          };
    return (
        <Box sx={sx}>
            <Typography variant="h5">{mealName}</Typography>
            {props.meals && props.meals.map((meal) => {
                return (
                    <Typography key={meal} variant="h6">
                        - {meal}
                    </Typography>
                );
            })}
        </Box>
    );
};

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
                    <MealInfo type="lunch" meals={mealInfo?.lunch.meals} />
                    <Divider orientation="vertical" flexItem />
                    <MealInfo type="dinner" meals={mealInfo?.dinner.meals} />
                    <Divider orientation="vertical" flexItem />
                    <MealInfo type="breakfast" meals={mealInfo?.breakfast.meals} />
                </Paper>
            </Box>
        </React.Fragment>
    );
}

export default MealPanel;
