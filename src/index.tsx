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
    Account,
    NotFound,
    BbsList,
    BbsPost,
    BbsCreate,
    BbsEdit,
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import EssentialComponents from "./components/EssentialComponents";
import { theme } from "./utils/Constant";
import PrivateRoute from "./components/PrivateRoute";
import RouteTracker from "./components/RouteTracker";
import { SnackbarProvider } from "notistack";
import FirebaseManager from "./components/FirebaseManager";
import { TimetablePanel } from "./components";
import Footer from "./components/Footer";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <ThemeProvider theme={theme}>
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
                <Box sx={{ minHeight: "100%" }}>
                    <Routes>
                        <Route index element={<Main />} />
                        <Route
                            path="survey"
                            element={<PrivateRoute permission={1} />}
                        >
                            <Route index element={<NotFound />} />
                            <Route path="create" element={<SurveyCreate />} />
                        </Route>
                        <Route
                            path="bbs"
                            element={<PrivateRoute permission={1} />}
                        >
                            <Route path="post/create" element={<BbsCreate />} />
                            <Route path="post/list" element={<BbsList />} />
                            <Route path="post/:postId" element={<BbsPost />} />
                            <Route
                                path="post/:postId/edit"
                                element={<BbsEdit />}
                            />
                        </Route>
                        <Route
                            path="chat"
                            element={<PrivateRoute permission={1} />}
                        >
                            <Route index element={<NotFound />} />
                            <Route path="idbot" element={<ChatIdbot />} />
                            <Route path="random" element={<ChatRandom />} />
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
                            path="account"
                            element={<PrivateRoute permission={1} />}
                        >
                            <Route index element={<Account />} />
                        </Route>
                        <Route
                            path="attendance"
                            element={<PrivateRoute permission={1} />}
                        >
                            <Route index element={<NotFound />} />
                            <Route path="info" element={<AttendanceInfo />} />
                            <Route
                                path="download"
                                element={<AttendanceDownload />}
                            />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Box>
                <Footer />
            </SnackbarProvider>
        </BrowserRouter>
    </ThemeProvider>
);
