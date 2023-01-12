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
    Contributors,
    Login,
    Register,
} from "./pages";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { TimetablePanel } from "./components";
import { getTheme, getThemeType } from "./components/theme";
import { dynamicLoader, Permission } from "./utils/Utility";
import { PrivateRoute, RouteWrapper } from "./components/router";

const themeType = getThemeType();

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RouteWrapper />}>
            <Route
                index
                element={<Main />}
                loader={() => dynamicLoader(Main)}
            />

            <Route
                path="auth"
                element={<PrivateRoute permission={Permission.Guest} only />}
            >
                <Route index element={<NotFound />} />
                <Route
                    path="login"
                    element={<Login />}
                    loader={() => dynamicLoader(Login)}
                />
                <Route
                    path="register"
                    element={<Register />}
                    loader={() => dynamicLoader(Register)}
                />
            </Route>

            <Route
                path="attendance"
                element={<PrivateRoute permission={Permission.Student} />}
            >
                <Route index element={<NotFound />} />
                <Route
                    path="info"
                    element={<AttendanceInfo />}
                    loader={() => dynamicLoader(AttendanceInfo)}
                />
                <Route
                    path="download"
                    element={<AttendanceDownload />}
                    loader={() => dynamicLoader(AttendanceDownload)}
                />
            </Route>

            <Route
                path="bbs"
                element={<PrivateRoute permission={Permission.Student} />}
            >
                <Route
                    path=":board/create"
                    element={<BbsCreate />}
                    loader={() => dynamicLoader(BbsCreate)}
                />
                <Route
                    path=":board/list"
                    element={<BbsList />}
                    loader={() => dynamicLoader(BbsList)}
                />
                <Route
                    path=":board/:postId"
                    element={<BbsPost />}
                    loader={() => dynamicLoader(BbsPost)}
                />
                <Route
                    path=":board/:postId/edit"
                    element={<BbsEdit />}
                    loader={() => dynamicLoader(BbsEdit)}
                />
            </Route>

            <Route
                path="chat"
                element={<PrivateRoute permission={Permission.Student} />}
            >
                <Route index element={<NotFound />} />
                <Route
                    path="idbot"
                    element={<ChatIdbot />}
                    loader={() => dynamicLoader(ChatIdbot)}
                />
                <Route
                    path="random"
                    element={<ChatRandom />}
                    loader={() => dynamicLoader(ChatRandom)}
                />
            </Route>

            <Route
                path="contributors"
                element={<PrivateRoute permission={Permission.Student} />}
            >
                <Route
                    index
                    element={<Contributors />}
                    loader={() => dynamicLoader(Contributors)}
                />
            </Route>

            <Route
                path="playground"
                element={<PrivateRoute permission={Permission.Student} />}
            >
                <Route index element={<NotFound />} />
                <Route
                    path="snake"
                    element={<PlaySnake />}
                    loader={() => dynamicLoader(PlaySnake)}
                />
            </Route>

            <Route
                path="timetable"
                element={<PrivateRoute permission={Permission.Student} />}
            >
                <Route index element={<TimetablePanel />} />
            </Route>
            <Route
                path="management"
                element={<PrivateRoute permission={Permission.Teacher} />}
            >
                <Route path="timetable" element={<TimetablePanel edit />} />
            </Route>

            <Route
                path="specialroom"
                element={<PrivateRoute permission={Permission.Student} />}
            >
                <Route index element={<NotFound />} />
                <Route
                    path="apply"
                    element={<SpecialroomApply />}
                    loader={() => dynamicLoader(SpecialroomApply)}
                />
                <Route
                    path="status"
                    element={<SpecialroomStatus />}
                    loader={() => dynamicLoader(SpecialroomStatus)}
                />
                <Route
                    path="management"
                    element={<PrivateRoute permission={Permission.Teacher} />}
                >
                    <Route
                        index
                        element={<SpecialroomManagement />}
                        loader={() => dynamicLoader(SpecialroomManagement)}
                    />
                </Route>
                <Route
                    path="outer"
                    element={<PrivateRoute permission={Permission.Teacher} />}
                >
                    <Route
                        index
                        element={<SpecialroomOuter />}
                        loader={() => dynamicLoader(SpecialroomOuter)}
                    />
                </Route>
            </Route>

            <Route
                path="setting"
                element={<PrivateRoute permission={Permission.Student} />}
            >
                <Route
                    index
                    element={<Setting />}
                    loader={() => dynamicLoader(Setting)}
                />
            </Route>

            <Route
                path="survey"
                element={<PrivateRoute permission={Permission.Student} />}
            >
                <Route index element={<NotFound />} />
                <Route
                    path="create"
                    element={<SurveyCreate />}
                    loader={() => dynamicLoader(SurveyCreate)}
                />
            </Route>

            <Route
                path="about"
                element={<PrivateRoute permission={Permission.Student} />}
            >
                <Route
                    index
                    element={<About />}
                    loader={() => dynamicLoader(About)}
                />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

export default function App() {
    return (
        <ThemeProvider theme={getTheme(themeType)}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}
