import { SHA3 } from "sha3";
import axios from "axios";
import { checkTokenExpiration, checkTokenError, onLogout } from "./AuthManager";
import { DefaultResponse } from "@common-jshs/menkakusitsu-lib";
import uuid from "react-uuid";
import { Buffer } from "buffer";

export interface BackendResponse {
    data: DefaultResponse;
}

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
    window.open(url, "_blank", "noopener,noreferrer");
};

export const getPermissionLevel = () => {
    if (!getUserInfo()) {
        return 0;
    }
    if (getUserInfo().isDev) {
        return 10;
    }
    if (getUserInfo().isTeacher) {
        return 2;
    }
    if (isLogined()) {
        return 1;
    }
    return 0;
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

export const getUserInfo = () => {
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

export const apiGet = async (path: string) => {
    const url = import.meta.env.VITE_API_PREFIX + path;
    let accessToken = localStorage.getItem("access-token");
    if (!accessToken) {
        return axios.get(url);
    }
    if (await checkTokenExpiration(accessToken)) {
        onLogout();
        throw new Error("Token expired.");
    }
    accessToken = localStorage.getItem("access-token");
    accessToken = `Bearer ${accessToken}`;
    return axios.get(url, {
        headers: {
            Authorization: accessToken,
        },
    });
    // .then(checkTokenError);
};

export const apiPost = async (path: string, body: any = null) => {
    const url = import.meta.env.VITE_API_PREFIX + path;
    let accessToken = localStorage.getItem("access-token");
    if (!accessToken) {
        return axios.post(url, body);
    }
    if (await checkTokenExpiration(accessToken)) {
        throw new Error("Token expired.");
    }
    accessToken = `Bearer ${accessToken}`;
    return axios.post(url, body, {
        headers: {
            Authorization: accessToken,
        },
    });
    // .then(checkTokenError);
};

export const apiPut = async (path: string, body: any = null) => {
    const url = import.meta.env.VITE_API_PREFIX + path;
    let accessToken = localStorage.getItem("access-token");
    if (!accessToken) {
        return axios.put(url);
    }
    if (await checkTokenExpiration(accessToken)) {
        throw new Error("Token expired.");
    }
    accessToken = `Bearer ${accessToken}`;
    return axios.put(url, body, {
        headers: {
            Authorization: accessToken,
        },
    });
    // .then(checkTokenError);
};

export const apiDelete = async (path: string, body: any = null) => {
    const url = import.meta.env.VITE_API_PREFIX + path;
    let accessToken = localStorage.getItem("access-token");
    if (!accessToken) {
        return axios.delete(url);
    }
    if (await checkTokenExpiration(accessToken)) {
        throw new Error("Token expired.");
    }
    accessToken = `Bearer ${accessToken}`;
    return axios.delete(url, {
        data: body,
        headers: {
            Authorization: accessToken,
        },
    });
    // .then(checkTokenError);
};
