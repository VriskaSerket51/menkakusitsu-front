import axios from "axios";
import { openConfirmDialog } from "../components/popup";
import { TITLE } from "./Constant";
import { clearTokens, parseJWT, redirecToHome } from "./Utility";

export interface BackendResponse {
    data: {
        status: number,
        message: string | null,
        [key: string]: any,
    }
}

export const onTokenExpired = (resp: BackendResponse) => {
    const result = resp.data;
    if (result.status === -1972) {
        openConfirmDialog(TITLE.Alert, "Session expired!", () => {
            clearTokens();
            redirecToHome();
        });
    }
    return resp;
};

export const checkTokenExpiration = async (accessToken: string) => {
    const parsedJWT = parseJWT(accessToken);
    if (!parsedJWT) {
        return;
    }
    const exp = parsedJWT.exp;
    if ((exp - Date.now() / 1000) < 60) {
        const refreshToken = localStorage.getItem("refresh-token");
        if (!refreshToken || !parseJWT(refreshToken)) {
            return;
        }
        const authHeader = `Bearer ${refreshToken}`
        const resp: BackendResponse = await axios({
            method: "POST",
            url: import.meta.env.VITE_API_PREFIX + "/v1/auth/refresh",
            headers: {
                Authorization: authHeader
            }
        });
        const result = resp.data;
        if (result.status >= 0) {
            clearTokens();
            localStorage.setItem("access-token", result.access_token);
            localStorage.setItem("refresh-token", result.refresh_token);
        }
        else {
            openConfirmDialog(TITLE.Alert, result.message, () => {
                clearTokens();
                redirecToHome();
            });
        }
    }
};