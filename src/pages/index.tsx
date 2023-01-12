import loadable from "@loadable/component";

export const Main = loadable(() => import("./main"));

export const Login = loadable(() => import("./auth/Login"));
export const Register = loadable(() => import("./auth/Register"));

export const AttendanceDownload = loadable(
    () => import("./attendance/Download")
);
export const AttendanceInfo = loadable(() => import("./attendance/Info"));

export const BbsCreate = loadable(() => import("./bbs/Create"));
export const BbsEdit = loadable(() => import("./bbs/Edit"));
export const BbsList = loadable(() => import("./bbs/List"));
export const BbsPost = loadable(() => import("./bbs/Post"));

export const ChatIdbot = loadable(() => import("./chat/Idbot"));
export const ChatRandom = loadable(() => import("./chat/RandomChat"));

export const Contributors = loadable(() => import("./contributors"));

export const PlaySnake = loadable(() => import("./playground/snake/SnakeGame"));

export const SpecialroomApply = loadable(() => import("./specialroom/Apply"));
export const SpecialroomStatus = loadable(() => import("./specialroom/Status"));
export const SpecialroomManagement = loadable(
    () => import("./specialroom/Management")
);
export const SpecialroomOuter = loadable(() => import("./specialroom/Outer"));

export const SurveyCreate = loadable(() => import("./survey/Create"));

export const About = loadable(() => import("./About"));

export const Setting = loadable(() => import("./setting"));

export const NotFound = loadable(() => import("./NotFound"));
export const Construct = loadable(() => import("./Construct"));
