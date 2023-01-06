import { getUserInfo } from "./Utility";

export const getPushApproved = () => {
    const hasPushJson = localStorage.getItem("has-push");
    if (!hasPushJson) {
        localStorage.setItem("has-push", JSON.stringify({}));
        return false;
    }
    const userInfo = getUserInfo();
    if (!userInfo) {
        return false;
    }
    return JSON.parse(hasPushJson)[userInfo.uid] === true;
};

export const setPushApproved = (value: boolean) => {
    let hasPushJson = localStorage.getItem("has-push");
    if (!hasPushJson) {
        hasPushJson = JSON.stringify({});
    }
    const userInfo = getUserInfo();
    if (!userInfo) {
        return;
    }
    const hasPush = JSON.parse(hasPushJson);
    hasPush[userInfo.uid] = value;
    localStorage.setItem("has-push", JSON.stringify(hasPush));
};
