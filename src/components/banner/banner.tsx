import React from "react";
import { Divider, Stack } from "@mui/material";
import { banners } from "./info";

function Banner() {
    return (
        <React.Fragment>
            <br />
            <Stack spacing={2} alignItems="center" justifyContent="center">
                <Stack
                    direction="row"
                    divider={
                        <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                        />
                    }
                    spacing={2}
                >
                    {banners.map((banner) => {
                        return (
                            <a
                                href={banner.link}
                                target="_blank"
                                rel="noopener"
                            >
                                <img
                                    src={banner.img}
                                    alt={banner.alt}
                                    height="120vh"
                                />
                            </a>
                        );
                    })}
                </Stack>
            </Stack>
            <br />
        </React.Fragment>
    );
}

export default Banner;
