import { getTokenPayload } from "./Utility";

export const getPushApproved = () => {
    const hasPushJson = localStorage.getItem("has-push");
    if (!hasPushJson) {
        localStorage.setItem("has-push", JSON.stringify({}));
        return false;
    }
    const payload = getTokenPayload();
    if (!payload) {
        return false;
    }
    return JSON.parse(hasPushJson)[payload.uid] === true;
};

export const setPushApproved = (value: boolean) => {
    let hasPushJson = localStorage.getItem("has-push");
    if (!hasPushJson) {
        hasPushJson = JSON.stringify({});
    }
    const payload = getTokenPayload();
    if (!payload) {
        return;
    }
    const hasPush = JSON.parse(hasPushJson);
    hasPush[payload.uid] = value;
    localStorage.setItem("has-push", JSON.stringify(hasPush));
};
