import axios from "axios";
import {
    clearTokens,
    parseJWT,
    redirectToHome,
} from "./Utility";
import { v1 } from "@common-jshs/menkakusitsu-lib";

export const checkTokenExpiration = async (accessToken: string) => {
    const parsedJWT = parseJWT(accessToken);
    if (!parsedJWT) {
        return false;
    }
    const exp: number = parsedJWT.exp;
    if (exp - Date.now() / 1000 < 60) {
        const refreshToken = localStorage.getItem("refresh-token");
        if (!refreshToken || !parseJWT(refreshToken)) {
            return true;
        }
        const authHeader = `Bearer ${refreshToken}`;
        const resp = await axios({
            method: "POST",
            url: import.meta.env.VITE_API_PREFIX + "/v1/auth/refresh",
            headers: {
                Authorization: authHeader,
            },
        });
        const result = resp.data as v1.PostRefreshResponse;
        if (result.status >= 0) {
            localStorage.setItem("access-token", result.accessToken);
            localStorage.setItem("refresh-token", result.refreshToken);
            return false;
        } else {
            // console.error(result.message);
            // openConfirmDialog(TITLE.Alert, result.message, onLogout);
            return true;
        }
    }
    return false;
};

export const onLogout = () => {
    clearTokens();
    redirectToHome();
};
