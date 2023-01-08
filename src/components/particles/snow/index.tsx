import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { Container, Engine } from "tsparticles-engine";
import { loadBaseMover } from "tsparticles-move-base";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadWobbleUpdater } from "tsparticles-updater-wobble";

export default function SnowParticle() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadBaseMover(engine);
        await loadCircleShape(engine);
        await loadColorUpdater(engine);
        await loadOpacityUpdater(engine);
        await loadOutModesUpdater(engine);
        await loadSizeUpdater(engine);
        await loadWobbleUpdater(engine);
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
