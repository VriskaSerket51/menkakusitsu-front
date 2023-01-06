import React from "react";
import { getPermissionLevel, Permission } from "../../utils/Utility";
import Teacher from "./Teacher";
import Student from "./Student";
import Guest from "./Guest";

function Main() {
    const permission = getPermissionLevel();
    switch (permission) {
        case Permission.Dev:
            return <Student />;
        case Permission.Teacher:
            return <Teacher />;
        case Permission.Student:
            return <Student />;
        case Permission.Guest:
            return <Guest />;
        default:
            return <Guest />;
    }
}

export default Main;
