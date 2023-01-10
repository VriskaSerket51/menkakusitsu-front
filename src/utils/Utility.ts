import { SHA3 } from "sha3";
import uuid from "react-uuid";
import { Buffer } from "buffer";

export const dayToString = (day: number) => {
    if (day < 0 || day > 7) {
        return null;
    }
    switch (day) {
        case 0:
        case 7:
            return "일";
        case 1:
            return "월";
        case 2:
            return "화";
        case 3:
            return "수";
        case 4:
            return "목";
        case 5:
            return "금";
        case 6:
            return "토";
    }
};

export const arrayRemove = <T>(array: Array<T>, item: T): Array<T> => {
    const index = array.indexOf(item);
    if (index > -1) {
        return array.splice(index, 1);
    }
    return [];
};

export const arrayRemoveAt = <T>(array: Array<T>, index: number): Array<T> => {
    if (index > -1) {
        return array.splice(index, 1);
    }
    return [];
};

export const validateEmail = (email: string): boolean => {
    const regex = new RegExp(
        "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );
    return regex.test(email);
};

export const getDeviceUuid = (): string => {
    const deviceUUid = localStorage.getItem("device-id");
    if (!deviceUUid) {
        localStorage.setItem("device-id", uuid());
        return getDeviceUuid();
    }
    return deviceUUid;
};

export const getParameter = (
    key: string,
    defaultValue: string = ""
): string => {
    const result = new URLSearchParams(window.location.search).get(key);
    if (result) {
        return result;
    } else {
        return defaultValue;
    }
};

export const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener");
};

export enum Permission {
    Guest = 0,
    Student = 1,
    Teacher = 2,
    Dev = 100,
}

export const getPermissionLevel = (): Permission => {
    const userInfo = getUserInfo();
    if (!userInfo) {
        return Permission.Guest;
    }
    if (userInfo.isDev) {
        return Permission.Dev;
    }
    if (userInfo.isTeacher) {
        return Permission.Teacher;
    }
    return Permission.Student;
};

export const isLogined = () => {
    return Boolean(localStorage.getItem("access-token"));
};

export const parseJWT = (token: string) => {
    try {
        return JSON.parse(
            Buffer.from(token.split(".")[1], "base64").toString("utf-8")
        );
    } catch (e) {
        console.error(e);
        return null;
    }
};

type UserInfo = {
    uid: number;
    id: string;
    isDev: boolean;
    isTeacher: boolean;
};

export const getUserInfo = (): UserInfo | null => {
    const accessToken = localStorage.getItem("access-token");
    if (!accessToken) {
        return null;
    }
    return parseJWT(accessToken);
};

export const redirectToHome = () => {
    window.location.href = "/";
};

export const clearTokens = () => {
    localStorage.setItem("access-token", "");
    localStorage.setItem("refresh-token", "");
};

export const SHA3_512 = (input: string) => {
    const hash = new SHA3(512);
    hash.update(input);
    return hash.digest("hex");
};
