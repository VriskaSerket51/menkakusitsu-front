import { Box } from "@mui/material";
import React from "react";

const WIDTH = 10;
const HEIGHT = 10;
const SPEED = 100;

const initialField = [...Array(WIDTH)].map((_) =>
    [...Array(HEIGHT)].map((_) => 0)
);

function Grid() {
    return (
        <Box
            sx={{ outline: "1px solid grey", width: "50px", height: "50px" }}
        ></Box>
    );
}

function Player() {
    return (
        <Box
            sx={{
                outline: "1px solid blue",
                backgroundColor: "blue",
                width: "50px",
                height: "50px",
            }}
        ></Box>
    );
}

const getGrid = (type: number): React.ReactNode => {
    switch (type) {
        case 0:
            return <Grid />;
        case 1:
            return <Player />;
    }
};

type Direction = "right" | "down" | "left" | "up" | "stop";

function SnakeGame() {
    const [lastDirection, setLastDirection] =
        React.useState<Direction>("right");
    const [direction, setDirection] = React.useState<Direction>("right");
    const [field, setField] = React.useState<number[][]>(initialField);

    const checkMove = React.useCallback(() => {
        let dx: number = 0;
        let dy: number = 0;
        switch (direction) {
            case "right":
                if (lastDirection !== "left") {
                    dx = 1;
                }
                break;
            case "down":
                if (lastDirection !== "up") {
                    dy = -1;
                }
                break;
            case "left":
                if (lastDirection !== "right") {
                    dx = -1;
                }
                break;
            case "up":
                if (lastDirection !== "down") {
                    dy = 1;
                }
                break;
        }
    }, []);

    const checkAlive = React.useCallback(() => {}, []);

    const updatePlayer = React.useCallback(() => {
        checkMove();
        checkAlive();
    }, [checkMove, checkAlive]);

    React.useEffect(() => {
        updatePlayer();
        const interval = setInterval(updatePlayer, SPEED);
        return () => clearInterval(interval);
    }, [updatePlayer]);

    return (
        <React.Fragment>
            <Box
                sx={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}
            >
                <Box
                    sx={{
                        width: "100vw",
                        height: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {field.map((row, i) => {
                        return (
                            <div>
                                {row.map((col, j) => {
                                    return (
                                        <Box key={`${i}_${j}`}>
                                            {getGrid(col)}
                                        </Box>
                                    );
                                })}
                            </div>
                        );
                    })}
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default SnakeGame;
