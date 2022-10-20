import { SHA3 } from "sha3";
import axios from "axios";
import { openConfirmDialog } from "../components/popup";
import { TITLE } from "./Constant";
import { checkTokenExpiration, onTokenExpired } from "./AuthManager";
import { DefaultResponse } from "@common-jshs/menkakusitsu-lib";
import uuid from "react-uuid";
import { Buffer } from "buffer";

export interface BackendResponse {
    data: DefaultResponse;
}

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
    await checkTokenExpiration(accessToken);
    accessToken = localStorage.getItem("access-token");
    accessToken = `Bearer ${accessToken}`;
    return axios
        .get(url, {
            headers: {
                Authorization: accessToken,
            },
        })
        .then(onTokenExpired)
        .then((resp) => {
            const result = resp.data;
            if (result.status < 0) {
                openConfirmDialog(TITLE.Alert, result.message, () => {
                    clearTokens();
                    redirectToHome();
                });
            }
            return resp;
        });
};

export const apiPost = async (path: string, body: any = null) => {
    const url = import.meta.env.VITE_API_PREFIX + path;
    let accessToken = localStorage.getItem("access-token");
    if (!accessToken) {
        return axios.post(url, body);
    }
    await checkTokenExpiration(accessToken);
    accessToken = `Bearer ${accessToken}`;
    return axios
        .post(url, body, {
            headers: {
                Authorization: accessToken,
            },
        })
        .then(onTokenExpired)
        .then((resp) => {
            const result = resp.data;
            if (result.status < 0) {
                openConfirmDialog(TITLE.Alert, result.message, () => {
                    clearTokens();
                    redirectToHome();
                });
            }
            return resp;
        });
};

export const apiPut = async (path: string, body: any = null) => {
    const url = import.meta.env.VITE_API_PREFIX + path;
    let accessToken = localStorage.getItem("access-token");
    if (!accessToken) {
        return axios.put(url);
    }
    await checkTokenExpiration(accessToken);
    accessToken = `Bearer ${accessToken}`;
    return axios
        .put(url, body, {
            headers: {
                Authorization: accessToken,
            },
        })
        .then(onTokenExpired)
        .then((resp) => {
            const result = resp.data;
            if (result.status < 0) {
                openConfirmDialog(TITLE.Alert, result.message, () => {
                    clearTokens();
                    redirectToHome();
                });
            }
            return resp;
        });
};

export const apiDelete = async (path: string, body: any = null) => {
    const url = import.meta.env.VITE_API_PREFIX + path;
    let accessToken = localStorage.getItem("access-token");
    if (!accessToken) {
        return axios.delete(url);
    }
    await checkTokenExpiration(accessToken);
    accessToken = `Bearer ${accessToken}`;
    return axios
        .delete(url, {
            data: body,
            headers: {
                Authorization: accessToken,
            },
        })
        .then(onTokenExpired)
        .then((resp) => {
            const result = resp.data;
            if (result.status < 0) {
                openConfirmDialog(TITLE.Alert, result.message, () => {
                    clearTokens();
                    redirectToHome();
                });
            }
            return resp;
        });
};
