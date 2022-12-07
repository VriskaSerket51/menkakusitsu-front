import { GetMealResponse } from "@common-jshs/menkakusitsu-lib/v1";
import React, { ReactNode } from "react";
import { getMeal } from "../../utils/Api";
import dayjs from "dayjs";
import { Box, Divider, Paper, SxProps, Theme, Typography } from "@mui/material";
import { dayToString } from "../../utils/Utility";

interface MealInfoProps {
    type: "breakfast" | "lunch" | "dinner";
    meals?: string[];
}

const MealInfo = (props: MealInfoProps) => {
    const currentHour = dayjs().hour();
    let mealName: string = "";
    let isHighlighted: boolean = false;
    switch (props.type) {
        case "breakfast":
            mealName = "아침";
            isHighlighted = currentHour >= 19;
            break;
        case "lunch":
            mealName = "점심";
            isHighlighted = currentHour < 13;
            break;
        case "dinner":
            mealName = "저녁";
            isHighlighted = currentHour >= 13 && currentHour < 19;
            break;
    }
    const Meal = ({ children }: { children: ReactNode }) => {
        if (isHighlighted) {
            return (
                <Box
                    sx={{
                        display: "block",
                        padding: "34px 30px 30px 30px",
                        borderRadius: "1px",
                        borderStyle: "solid none none none",
                        borderColor: "primary.main",
                        borderWidth: "8px",
                    }}
                >
                    {children}
                </Box>
            );
        } else {
            return (
                <Box
                    sx={{
                        display: "block",
                        padding: "50px 30px 30px 30px",
                    }}
                >
                    {children}
                </Box>
            );
        }
    };
    return (
        <Meal>
            <Typography variant="h5">{mealName}</Typography>
            {props.meals &&
                props.meals.map((meal) => {
                    return (
                        <Typography key={meal} variant="h6">
                            - {meal}
                        </Typography>
                    );
                })}
        </Meal>
    );
};

function MealPanel() {
    const [mealInfo, setMealInfo] = React.useState<GetMealResponse | null>(
        null
    );
    const [isLoading, setIsLoading] = React.useState(true);
    const today = dayjs();

    React.useEffect(() => {
        getMeal(
            { when: today.startOf("day").format("YYYY-MM-DD") },
            (result) => {
                setMealInfo(result);
                setIsLoading(false);
            }
        );
    }, []);

    return (
        <React.Fragment>
            <Box>
                <Paper>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-around",
                        }}
                    >
                        <MealInfo type="lunch" meals={mealInfo?.lunch.meals} />
                        <Divider orientation="vertical" flexItem />
                        <MealInfo
                            type="dinner"
                            meals={mealInfo?.dinner.meals}
                        />
                        <Divider orientation="vertical" flexItem />
                        <MealInfo
                            type="breakfast"
                            meals={mealInfo?.breakfast.meals}
                        />
                    </Box>
                </Paper>
            </Box>
        </React.Fragment>
    );
}

export default MealPanel;
