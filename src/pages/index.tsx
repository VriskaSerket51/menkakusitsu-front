import React from "react";
import loadable from "@loadable/component";
import FixedNavbar from "../components/navbar";

function Fallback() {
    return <FixedNavbar />;
}

export const Main = loadable(() => import("./Main"));
Main.preload();

export const AttendanceDownload = loadable(
    () => import("./attendance/Download")
);
export const AttendanceInfo = loadable(() => import("./attendance/Info"));
AttendanceDownload.preload();
AttendanceInfo.preload();

export const BbsCreate = loadable(() => import("./bbs/Create"));
export const BbsEdit = loadable(() => import("./bbs/Edit"));
export const BbsList = loadable(() => import("./bbs/List"));
export const BbsPost = loadable(() => import("./bbs/Post"));
BbsCreate.preload();
BbsEdit.preload();
BbsList.preload();
BbsPost.preload();

export const ChatIdbot = loadable(() => import("./chat/Idbot"));
export const ChatRandom = loadable(() => import("./chat/RandomChat"));
ChatIdbot.preload();
ChatRandom.preload();

export const PlaySnake = loadable(() => import("./playground/snake/SnakeGame"));
PlaySnake.preload();

export const SpecialroomApply = loadable(() => import("./specialroom/Apply"));
export const SpecialroomStatus = loadable(() => import("./specialroom/Status"));
export const SpecialroomManagement = loadable(
    () => import("./specialroom/Management")
);
SpecialroomApply.preload();
SpecialroomStatus.preload();
SpecialroomManagement.preload();

export const SurveyCreate = loadable(() => import("./survey/Create"));
SurveyCreate.preload();

export const About = loadable(() => import("./About"));
About.preload();

export const Setting = loadable(() => import("./setting"));
Setting.preload();

export const NotFound = loadable(() => import("./NotFound"));
export const Construct = loadable(() => import("./Construct"));
NotFound.preload();
Construct.preload();
