import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Container, Engine } from "tsparticles-engine";

import kwoojun from "../../../assets/particles/k-woojun/kwoojun.jpg";

export default function KWoojunParticle() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(
        async (container: Container | undefined) => {},
        []
    );

    return (
        <Particles
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                particles: {
                    shape: {
                        type: "images",
                        options: {
                            images: [
                                {
                                    src: kwoojun,
                                    width: 130,
                                    height: 173,
                                },
                            ],
                        },
                    },
                    move: {
                        direction: "bottom-right",
                        enable: true,
                        random: false,
                        straight: false,
                        speed: 5,
                    },
                    rotate: {
                        value: {
                            min: 0,
                            max: 360,
                        },
                        direction: "random",
                        move: true,
                        animation: {
                            enable: true,
                            speed: 10,
                        },
                    },
                    tilt: {
                        direction: "random",
                        enable: true,
                        move: true,
                        value: {
                            min: 0,
                            max: 360,
                        },
                        animation: {
                            enable: true,
                            speed: 30,
                        },
                    },
                    roll: {
                        darken: {
                            enable: true,
                            value: 25,
                        },
                        enable: true,
                        speed: {
                            min: 5,
                            max: 15,
                        },
                    },
                    opacity: {
                        value: { min: 0.5, max: 0.7 },
                    },
                    size: {
                        value: { min: 15, max: 20 },
                    },
                    number: {
                        max: 15,
                    },
                },
            }}
        />
    );
}
