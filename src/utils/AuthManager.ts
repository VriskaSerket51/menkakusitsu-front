import axios from "axios";
import { openConfirmDialog } from "../components/popup";
import { TITLE } from "./Constant";
import {
    BackendResponse,
    clearTokens,
    parseJWT,
    redirectToHome,
} from "./Utility";
import { PostRefreshResponse } from "@common-jshs/menkakusitsu-lib/v1";

export const checkTokenError = (resp: BackendResponse) => {
    const result = resp.data;
    if (result.status >= 0) {
        return resp;
    }
    if (result.status === -1972) {
        openConfirmDialog(TITLE.Alert, "세션이 만료됐습니다!", () => {
            clearTokens();
            redirectToHome();
        });
        throw new Error(result.message);
    } else if (result.status === -1973) {
        openConfirmDialog(TITLE.Alert, "손상된 토큰입니다!", () => {
            clearTokens();
            redirectToHome();
        });
        throw new Error(result.message);
    }
    return resp;
};

export const checkTokenExpiration = async (accessToken: string) => {
    const parsedJWT = parseJWT(accessToken);
    if (!parsedJWT) {
        return false;
    }
    const exp = parsedJWT.exp;
    if (exp - Date.now() / 1000 < 60) {
        const refreshToken = localStorage.getItem("refresh-token");
        if (!refreshToken || !parseJWT(refreshToken)) {
            return true;
        }
        const authHeader = `Bearer ${refreshToken}`;
        const resp: BackendResponse = await axios({
            method: "POST",
            url: import.meta.env.VITE_API_PREFIX + "/v1/auth/refresh",
            headers: {
                Authorization: authHeader,
            },
        });
        const result = resp.data as PostRefreshResponse;
        if (result.status >= 0) {
            localStorage.setItem("access-token", result.accessToken);
            localStorage.setItem("refresh-token", result.refreshToken);
            return false;
        } else {
            openConfirmDialog(TITLE.Alert, result.message, () => {
                clearTokens();
                redirectToHome();
            });
            return true;
        }
    }
};
