import React from "react";
import { Outlet } from "react-router-dom";
import { SnowParticle } from "./snow";

interface ParticleLayoutProps {
    type: "snow" | "none";
}

function ParticleLayout(props: ParticleLayoutProps) {
    switch (props.type) {
        case "snow":
            return (
                <React.Fragment>
                    <SnowParticle />
                    <Outlet />
                </React.Fragment>
            );
        case "none":
            return <Outlet />;
    }
}

export default ParticleLayout;

export * from "./snow";
