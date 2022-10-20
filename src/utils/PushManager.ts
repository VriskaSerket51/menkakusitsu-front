import { getUserInfo } from "./Utility";

export const getPushApproved = () => {
    const hasPushJson = localStorage.getItem('has-push');
    if (!hasPushJson) {
        localStorage.setItem('has-push', JSON.stringify({}));
        return false;
    }
    return JSON.parse(hasPushJson)[getUserInfo().uid] === true;
}

export const setPushApproved = (value: boolean) => {
    let hasPushJson = localStorage.getItem('has-push');
    if (!hasPushJson) {
        hasPushJson = JSON.stringify({});
    }
    const hasPush = JSON.parse(hasPushJson);
    hasPush[getUserInfo().uid] = value
    localStorage.setItem('has-push', JSON.stringify(hasPush))
}