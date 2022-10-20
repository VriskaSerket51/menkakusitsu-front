import axios from "axios";
import { openConfirmDialog } from "../components/popup";
import { TITLE } from "./Constant";
import { BackendResponse, clearTokens, parseJWT, redirectToHome } from "./Utility";
import { PostRefreshResponse } from "@common-jshs/menkakusitsu-lib/v1";

export const onTokenExpired = (resp: BackendResponse) => {
    const result = resp.data;
    if (result.status === -1972) {
        openConfirmDialog(TITLE.Alert, "Session expired!", () => {
            clearTokens();
            redirectToHome();
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
    if (exp - Date.now() / 1000 < 60) {
        const refreshToken = localStorage.getItem("refresh-token");
        if (!refreshToken || !parseJWT(refreshToken)) {
            return;
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
            clearTokens();
            localStorage.setItem("access-token", result.accessToken);
            localStorage.setItem("refresh-token", result.refreshToken);
        } else {
            openConfirmDialog(TITLE.Alert, result.message, () => {
                clearTokens();
                redirectToHome();
            });
        }
    }
};
