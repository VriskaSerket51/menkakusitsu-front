import { deletePushToken } from "../components/FirebaseManager";
import { BackendResponse } from "./AuthManager";
import { getPushApproved } from "./PushManager";
import { apiDELETE, apiGET, apiPOST } from "./Utility";

export const getSpecialroomLocations = (onFinish: (resp: BackendResponse) => any) => {
    apiGET("/v1/specialroom/locations")
        .then(onFinish);
};

export const postSpecialroomApply = (location: string, purpose: string, applicants: string, teacherUID: number, when: number, onFinish: (resp: BackendResponse) => any) => {
    apiPOST("/v1/specialroom/apply", {
        "location": location,
        "purpose": purpose,
        "applicants": applicants,
        "teacherUID": teacherUID,
        "when": when,
    })
        .then(onFinish);
};

export const getSpecialroomApplyStatus = (when: number, onFinish: (resp: BackendResponse) => any) => {
    apiGET(`/v1/specialroom/apply?when=${when}`)
        .then(onFinish);
};

export const logout = (onFinish: (resp: BackendResponse) => any) => {
    if (getPushApproved()) {
        deletePushToken(() => {
            apiDELETE("/v1/auth/logout")
                .then(onFinish);
        })
    }
    else {
        apiDELETE("/v1/auth/logout")
            .then(onFinish);
    }
};

interface PushNotification {
    title: string,
    body: string,
    link?: string,
}

export const sendPushNotification = (targetUID: number, notification: PushNotification, onFinish: (resp: BackendResponse) => any) => {
    apiPOST("/v1/user/push", {
        targetUID: targetUID,
        notification: notification
    })
        .then(onFinish);
};