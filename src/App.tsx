import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./styles/Fonts.css";
import "./styles/NProgress.css";

import {
    Main,
    AttendanceDownload,
    AttendanceInfo,
    ChatIdbot,
    ChatRandom,
    SpecialroomApply,
    SpecialroomStatus,
    SpecialroomManagement,
    SurveyCreate,
    About,
    Setting,
    NotFound,
    BbsList,
    BbsPost,
    BbsCreate,
    BbsEdit,
    PlaySnake,
    SpecialroomOuter,
} from "./pages";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { TimetablePanel } from "./components";
import {
    getTheme,
    RouteWrapper,
    PrivateRoute
} from "./components/router";

const theme = getTheme();

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RouteWrapper />}>
            <Route index element={<Main />} />

            <Route path="survey" element={<PrivateRoute permission={1} />}>
                <Route index element={<NotFound />} />
                <Route path="create" element={<SurveyCreate />} />
            </Route>

            <Route path="bbs" element={<PrivateRoute permission={1} />}>
                <Route path=":board/create" element={<BbsCreate />} />
                <Route path=":board/list" element={<BbsList page={1} />} />
                <Route path=":board/:postId" element={<BbsPost />} />
                <Route path=":board/:postId/edit" element={<BbsEdit />} />
            </Route>

            <Route path="playground" element={<PrivateRoute permission={1} />}>
                <Route index element={<NotFound />} />
                <Route path="snake" element={<PlaySnake />} />
            </Route>

            <Route path="specialroom" element={<PrivateRoute permission={1} />}>
                <Route index element={<NotFound />} />
                <Route path="apply" element={<SpecialroomApply />} />
                <Route path="status" element={<SpecialroomStatus />} />
                <Route
                    path="management"
                    element={<PrivateRoute permission={2} />}
                >
                    <Route index element={<SpecialroomManagement />} />
                </Route>
                <Route path="outer" element={<PrivateRoute permission={2} />}>
                    <Route index element={<SpecialroomOuter />} />
                </Route>
            </Route>

            <Route path="timetable" element={<PrivateRoute permission={1} />}>
                <Route index element={<TimetablePanel />} />
            </Route>
            <Route path="management" element={<PrivateRoute permission={2} />}>
                <Route path="timetable" element={<TimetablePanel edit />} />
            </Route>

            <Route path="about" element={<PrivateRoute permission={1} />}>
                <Route index element={<About />} />
            </Route>

            <Route path="setting" element={<PrivateRoute permission={1} />}>
                <Route index element={<Setting />} />
            </Route>

            <Route path="attendance" element={<PrivateRoute permission={1} />}>
                <Route index element={<NotFound />} />
                <Route path="info" element={<AttendanceInfo />} />
                <Route path="download" element={<AttendanceDownload />} />
            </Route>

            <Route path="chat" element={<PrivateRoute permission={1} />}>
                <Route index element={<NotFound />} />
                <Route path="idbot" element={<ChatIdbot />} />
                <Route path="random" element={<ChatRandom />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

export default function App() {
    return (
        <ThemeProvider theme={theme.value}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}
