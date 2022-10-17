import loadable from '@loadable/component';

export const Main = loadable(() => import('./Main'));

export const AttendanceDownload = loadable(() => import('./attendance/Download'));
export const AttendanceInfo = loadable(() => import('./attendance/Info'));

export const ChatIdbot = loadable(() => import('./chat/Idbot'));
export const ChatRandom = loadable(() => import('./chat/RandomChat'));

export const SpecialroomApply = loadable(() => import('./specialroom/Apply'));
export const SpecialroomStatus = loadable(() => import('./specialroom/Status'));
export const SpecialroomManagement = loadable(() => import('./specialroom/Management'));

export const SurveyCreate = loadable(() => import('./survey/Create'));

export const About = loadable(() => import('./About'));

export const Account = loadable(() => import('./Account'));

export const NotFound = loadable(() => import('./NotFound'));


