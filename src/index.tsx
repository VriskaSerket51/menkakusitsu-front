import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./styles/Fonts.css";

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
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import EssentialComponents from "./components/EssentialComponents";
import { christmasTheme, defaultTheme } from "./utils/Constant";
import PrivateRoute from "./components/PrivateRoute";
import RouteTracker from "./components/RouteTracker";
import { SnackbarProvider } from "notistack";
import FirebaseManager from "./components/FirebaseManager";
import { TimetablePanel } from "./components";
import FooterLayout from "./components/layout/FooterLayout";
import ThemeLayout from "./components/layout/ThemeLayout";

document.getElementById("preview")!.innerHTML = "";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <EssentialComponents />
        <BrowserRouter>
            <SnackbarProvider
                maxSnack={5}
                autoHideDuration={6000}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <FirebaseManager />
                <RouteTracker />
                <Routes>
                    <Route element={<ThemeLayout type="christmas" />}>
                        <Route element={<FooterLayout />}>
                            <Route index element={<Main />} />
                            <Route
                                path="survey"
                                element={<PrivateRoute permission={1} />}
                            >
                                <Route index element={<NotFound />} />
                                <Route
                                    path="create"
                                    element={<SurveyCreate />}
                                />
                            </Route>
                            <Route
                                path="bbs"
                                element={<PrivateRoute permission={1} />}
                            >
                                <Route
                                    path=":board/create"
                                    element={<BbsCreate />}
                                />
                                <Route
                                    path=":board/list"
                                    element={<BbsList />}
                                />
                                <Route
                                    path=":board/:postId"
                                    element={<BbsPost />}
                                />
                                <Route
                                    path=":board/:postId/edit"
                                    element={<BbsEdit />}
                                />
                            </Route>
                            <Route
                                path="playground"
                                element={<PrivateRoute permission={1} />}
                            >
                                <Route index element={<NotFound />} />
                                <Route path="snake" element={<PlaySnake />} />
                            </Route>
                            <Route
                                path="specialroom"
                                element={<PrivateRoute permission={1} />}
                            >
                                <Route index element={<NotFound />} />
                                <Route
                                    path="apply"
                                    element={<SpecialroomApply />}
                                />
                                <Route
                                    path="status"
                                    element={<SpecialroomStatus />}
                                />
                                <Route
                                    path="management"
                                    element={<PrivateRoute permission={2} />}
                                >
                                    <Route
                                        index
                                        element={<SpecialroomManagement />}
                                    />
                                </Route>
                            </Route>
                            <Route
                                path="timetable"
                                element={<PrivateRoute permission={1} />}
                            >
                                <Route index element={<TimetablePanel />} />
                            </Route>
                            <Route
                                path="management"
                                element={<PrivateRoute permission={2} />}
                            >
                                <Route
                                    path="timetable"
                                    element={<TimetablePanel edit />}
                                />
                            </Route>
                            <Route
                                path="about"
                                element={<PrivateRoute permission={1} />}
                            >
                                <Route index element={<About />} />
                            </Route>
                            <Route
                                path="setting"
                                element={<PrivateRoute permission={1} />}
                            >
                                <Route index element={<Setting />} />
                            </Route>
                            <Route
                                path="attendance"
                                element={<PrivateRoute permission={1} />}
                            >
                                <Route index element={<NotFound />} />
                                <Route
                                    path="info"
                                    element={<AttendanceInfo />}
                                />
                            </Route>
                        </Route>

                        <Route
                            path="chat"
                            element={<PrivateRoute permission={1} />}
                        >
                            <Route index element={<NotFound />} />
                            <Route path="idbot" element={<ChatIdbot />} />
                            <Route path="random" element={<ChatRandom />} />
                        </Route>
                    </Route>

                    <Route
                        path="attendance"
                        element={<PrivateRoute permission={1} />}
                    >
                        <Route index element={<NotFound />} />
                        <Route
                            path="download"
                            element={<AttendanceDownload />}
                        />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </SnackbarProvider>
        </BrowserRouter>
    </ThemeProvider>
);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .catch((e) => console.log(e));
    });
}
