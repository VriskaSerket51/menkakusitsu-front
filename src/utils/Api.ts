import { deletePushToken } from "../components/FirebaseManager";
import axios from "axios";
import { checkTokenExpiration, onLogout } from "./AuthManager";
import { getPushApproved } from "./PushManager";
import { DefaultResponse } from "@common-jshs/menkakusitsu-lib";
import { v1 } from "@common-jshs/menkakusitsu-lib";
import { closeWaitDialog, openConfirmDialog } from "../components/popup";
import { DialogTitle } from "./Constant";

const onApiError = (e: any) => {
    console.error(e);
    closeWaitDialog();
    const error = `${e}`;
    if (error.includes("400")) {
        openConfirmDialog(DialogTitle.Alert, "데이터 형식이 잘못되었습니다.");
    } else if (error.includes("403")) {
        openConfirmDialog(DialogTitle.Alert, "권한이 부족합니다.");
    } else if (error.includes("500")) {
        openConfirmDialog(
            DialogTitle.Alert,
            "데이터 처리 중 에러가 발생했습니다."
        );
    }
};

const isApiSuccessed = (result: DefaultResponse) => {
    return result.status >= 0;
};

export const apiRequest = async (method: string, path: string, data?: any) => {
    const url = import.meta.env.VITE_API_PREFIX + path;
    let accessToken = localStorage.getItem("access-token");
    if (!accessToken) {
        return axios({ method: method, url: url, data: data });
    }
    if (await checkTokenExpiration(accessToken)) {
        onLogout();
        throw new Error("Token expired.");
    }
    accessToken = localStorage.getItem("access-token");
    accessToken = `Bearer ${accessToken}`;
    return axios({
        method: method,
        url: url,
        data: data,
        headers: {
            Authorization: accessToken,
        },
    });
};

export const apiGet = async (path: string) => {
    return apiRequest("get", path);
};

export const apiPost = async <T>(path: string, body?: any) => {
    return apiRequest("post", path, body);
};

export const apiPut = async <T>(path: string, body: any = null) => {
    return apiRequest("put", path, body);
};

export const apiDelete = async <T>(path: string, body: any = null) => {
    return apiRequest("delete", path, body);
};

//Auth
export const postRegister = (
    props: v1.PostRegisterRequest,
    onFinish: (result: v1.PostRegisterResponse) => any
) => {
    apiPost("/v1/auth/account", props)
        .then((resp) => {
            const result: v1.PostLoginResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const deleteSecession = (
    props: v1.DeleteSecessionRequest,
    onFinish: (result: v1.DeleteSecessionResponse) => any
) => {
    apiDelete("/v1/auth/account", props)
        .then((resp) => {
            const result: v1.DeleteSecessionResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const postLogin = (
    props: v1.PostLoginRequest,
    onSuccessed: (result: v1.PostLoginResponse) => any,
    onFailed: (result: v1.PostLoginResponse) => any
) => {
    apiPost("/v1/auth/login", props)
        .then((resp) => {
            const result: v1.PostLoginResponse = resp.data;
            if (isApiSuccessed(result)) {
                onSuccessed(result);
            } else {
                onFailed(result);
            }
        })
        .catch(onApiError);
};

export const deleteLogout = (
    props: v1.DeleteLogoutRequest,
    onFinish: (result: v1.DeleteLogoutResponse) => any
) => {
    const logout = () => {
        apiDelete("/v1/auth/logout", props)
            .then((resp) => {
                const result: v1.DeleteLogoutResponse = resp.data;
                if (isApiSuccessed(result)) {
                    onFinish(result);
                } else {
                    closeWaitDialog();
                    openConfirmDialog(DialogTitle.Alert, result.message);
                }
            })
            .catch(onApiError);
    };
    if (getPushApproved()) {
        deletePushToken(() => {
            logout();
        });
    } else {
        logout();
    }
};

//BBS
export const getBbsPostList = (
    props: v1.GetBbsPostListRequest,
    onFinish: (result: v1.GetBbsPostListResponse) => any
) => {
    apiGet(
        `/v1/bbs/post/list?board=${props.board}&postPage=${props.postPage}&postListSize=${props.postListSize}`
    )
        .then((resp) => {
            const result: v1.GetBbsPostListResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const getBbsPost = (
    props: v1.GetBbsPostRequest,
    onFinish: (result: v1.GetBbsPostResponse) => any
) => {
    apiGet(`/v1/bbs/post?board=${props.board}&postId=${props.postId}`)
        .then((resp) => {
            const result: v1.GetBbsPostResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message, onFinish);
            }
        })
        .catch(onApiError);
};

export const postBbsPost = (
    props: v1.PostBbsPostRequest,
    onFinish: (result: v1.PostBbsPostResponse) => any
) => {
    apiPost("/v1/bbs/post", props)
        .then((resp) => {
            const result: v1.PostBbsPostResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const putBbsPost = (
    props: v1.PutBbsPostRequest,
    onFinish: (result: v1.PutBbsPostResponse) => any
) => {
    apiPut("/v1/bbs/post", props)
        .then((resp) => {
            const result: v1.PutBbsPostResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const deleteBbsPost = (
    props: v1.DeleteBbsPostRequest,
    onFinish: (result: v1.DeleteBbsPostResponse) => any
) => {
    apiDelete("/v1/bbs/post", props)
        .then((resp) => {
            const result: v1.DeleteBbsPostResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const getBbsPostHeaders = (
    props: v1.GetBbsPostHeaderRequest,
    onFinish: (result: v1.GetBbsPostHeaderResponse) => any
) => {
    apiGet(`/v1/bbs/post/headers?board=${props.board}`)
        .then((resp) => {
            const result: v1.GetBbsPostHeaderResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const getBbsCommentList = (
    props: v1.GetBbsCommentListRequest,
    onFinish: (result: v1.GetBbsCommentListResponse) => any
) => {
    apiGet(
        `/v1/bbs/comment/list?board=${props.board}&postId=${props.postId}&commentPage=${props.commentPage}&commentListSize=${props.commentListSize}`
    )
        .then((resp) => {
            const result: v1.GetBbsCommentListResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const postBbsComment = (
    props: v1.PostBbsCommentRequest,
    onFinish: (result: v1.PostBbsCommentResponse) => any
) => {
    apiPost("/v1/bbs/comment", props)
        .then((resp) => {
            const result: v1.PostBbsCommentResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const deleteBbsComment = (
    props: v1.DeleteBbsCommentRequest,
    onFinish: (result: v1.DeleteBbsCommentResponse) => any
) => {
    apiDelete("/v1/bbs/comment", props)
        .then((resp) => {
            const result: v1.DeleteBbsCommentResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

//Chat
export const getIdbotChat = (
    props: v1.GetIdbotChatRequest,
    onFinish: (result: v1.GetIdbotChatResponse) => any
) => {
    apiGet(`/v1/chat/idbot/message?chatInput=${props.chatInput}`)
        .then((resp) => {
            const result: v1.GetIdbotChatResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

//Timetable
export const getMeal = (
    props: v1.GetMealRequest,
    onFinish: (result: v1.GetMealResponse) => any
) => {
    apiGet(`/v1/meal/now`)
        .then((resp) => {
            const result: v1.GetMealResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

//Specialroom
export const getSpecialroomApply = (
    props: v1.GetApplyRequest,
    onFinish: (result: v1.GetApplyResponse) => any
) => {
    apiGet(`/v1/specialroom/apply?when=${props.when}`)
        .then((resp) => {
            const result: v1.GetApplyResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const postSpecialroomApply = (
    props: v1.PostApplyRequest,
    onFinish: (result: v1.PostApplyResponse) => any
) => {
    apiPost("/v1/specialroom/apply", props)
        .then((resp) => {
            const result: v1.PostApplyResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const deleteSpecialroomApply = (
    props: v1.DeleteApplyRequest,
    onFinish: (result: v1.DeleteApplyResponse) => any
) => {
    apiDelete("/v1/specialroom/apply", props)
        .then((resp) => {
            const result: v1.DeleteApplyResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const getAttendanceInfo = (
    props: v1.GetAttendanceInfoRequest,
    onFinish: (result: v1.GetAttendanceInfoResponse) => any
) => {
    apiGet("/v1/specialroom/attendance/info")
        .then((resp) => {
            const result: v1.GetAttendanceInfoResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const getAttendanceList = (
    props: v1.GetAttendanceListRequest,
    onFinish: (result: v1.GetAttendanceListResponse) => any
) => {
    apiGet(`/v1/specialroom/attendance/list?when=${props.when}`)
        .then((resp) => {
            const result: v1.GetAttendanceListResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const getSpecialroomInfo = (
    props: v1.GetInfoRequest,
    onFinish: (result: v1.GetInfoResponse) => any
) => {
    apiGet("/v1/specialroom/info")
        .then((resp) => {
            const result: v1.GetInfoResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const putSpecialroomInfo = (
    props: v1.PutInfoRequest,
    onFinish: (result: v1.PutInfoResponse) => any
) => {
    apiPut("/v1/specialroom/info", props)
        .then((resp) => {
            const result: v1.PutInfoResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const getSpecialroomManagerInfo = (
    props: v1.GetManagerRequest,
    onFinish: (result: v1.GetManagerResponse) => any
) => {
    apiGet(`/v1/specialroom/info/manager/${props.when}`)
        .then((resp) => {
            const result: v1.GetManagerResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                onFinish(result);
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const getSpecialroomLocationInfo = (
    props: v1.GetLocationInfoRequest,
    onFinish: (result: v1.GetLocationInfoResponse) => any
) => {
    apiGet("/v1/specialroom/info/location")
        .then((resp) => {
            const result: v1.GetLocationInfoResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const getSpecialroomPurposeInfo = (
    props: v1.GetPurposeInfoRequest,
    onFinish: (result: v1.GetPurposeInfoResponse) => any
) => {
    apiGet("/v1/specialroom/info/purpose")
        .then((resp) => {
            const result: v1.GetPurposeInfoResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const getSpecialroomStudentInfo = (
    props: v1.GetStudentInfoRequest,
    onFinish: (result: v1.GetStudentInfoResponse) => any
) => {
    apiGet("/v1/specialroom/info/student")
        .then((resp) => {
            const result: v1.GetStudentInfoResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const getSpecialroomTeacherInfo = (
    props: v1.GetTeacherInfoRequest,
    onFinish: (result: v1.GetTeacherInfoResponse) => any
) => {
    apiGet("/v1/specialroom/info/teacher")
        .then((resp) => {
            const result: v1.GetTeacherInfoResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

//Timetable
export const getTimetable = (
    props: v1.GetTimetableRequest,
    onFinish: (result: v1.GetTimetableResponse) => any
) => {
    apiGet(`/v1/timetable/${props.when}`)
        .then((resp) => {
            const result: v1.GetTimetableResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const putTimetable = (
    props: v1.PutTimetableRequest,
    onFinish: (result: v1.PutTimetableResponse) => any
) => {
    apiPut(`/v1/timetable/${props.when}`, props)
        .then((resp) => {
            const result: v1.GetTimetableResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

//User
export const postUserPush = (
    props: v1.PostPushRequest,
    onFinish: (result: v1.PostPushResponse) => any
) => {
    apiPost("/v1/user/push", props)
        .then((resp) => {
            const result: v1.PostPushResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const putUserPush = (
    props: v1.PutPushRequest,
    onFinish: (result: v1.PutPushResponse) => any
) => {
    apiPut("/v1/user/push", props)
        .then((resp) => {
            const result: v1.PutPushResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const deleteUserPush = (
    props: v1.DeletePushRequest,
    onFinish: (result: v1.DeletePushResponse) => any
) => {
    apiDelete("/v1/user/push", props)
        .then((resp) => {
            const result: v1.DeletePushResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const getMyPrivateInfo = (
    props: v1.GetMyPrivateInfoRequest,
    onFinish: (result: v1.GetMyPrivateInfoResponse) => any
) => {
    apiGet("/v1/user/me")
        .then((resp) => {
            const result: v1.GetMyPrivateInfoResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const putMyEmail = (
    props: v1.PutEmailRequest,
    onFinish: (result: v1.PutEmailResponse) => any
) => {
    apiPut("/v1/user/me/email", props)
        .then((resp) => {
            const result: v1.PutEmailResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};

export const putMyPassword = (
    props: v1.PutPasswordRequest,
    onFinish: (result: v1.PutPasswordResponse) => any
) => {
    apiPut("/v1/user/me/password", props)
        .then((resp) => {
            const result: v1.PutPasswordResponse = resp.data;
            if (isApiSuccessed(result)) {
                onFinish(result);
            } else {
                closeWaitDialog();
                openConfirmDialog(DialogTitle.Alert, result.message);
            }
        })
        .catch(onApiError);
};
