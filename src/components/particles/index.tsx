import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

export function SnowParticle() {
    const particlesInit = useCallback(async (engine: Engine) => {
        console.log(engine);

        // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(
        async (container: Container | undefined) => {
            await console.log(container);
        },
        []
    );

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                particles: {
                    move: {
                        direction: "bottom",
                        enable: true,
                        random: false,
                        straight: false,
                    },
                    opacity: {
                        value: { min: 0.1, max: 0.5 },
                    },
                    size: {
                        value: { min: 1, max: 10 },
                    },
                    wobble: {
                        distance: 20,
                        enable: true,
                        speed: {
                            min: -5,
                            max: 5,
                        },
                    },
                },
            }}
        />
    );
}
