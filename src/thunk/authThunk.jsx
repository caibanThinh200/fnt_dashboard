import { message } from "antd";
import { checkUserAction, checkUserSuccess, loginAction, loginActionFailed, loginActionSuccess } from "../action/authAction";
import INFO_DEFINE from "../Constant/infoDefine";
import AuthRequest from "../Mapping/Request/authRequest";
import {
    getDetailWithJWTService,
    loginService
} from "../Service/authService";


const login = data => async dispatch => {
    const requestPayload = new AuthRequest(data);
    dispatch(loginAction());
    message.loading({ content: "Đang xử lí", key: "login" })
    await loginService(requestPayload).then(async res => {
        const responseData = res.data;
        if (responseData.status === "FAILED") {
            message.error({ content: responseData.error?.message, key: "login" });
            dispatch(loginActionFailed())
        } else {
            localStorage.setItem(INFO_DEFINE.KEY.userToken, responseData.result?.token);
            dispatch(loginActionSuccess())
            message.success({ content: "Đăng nhập thành công", key: "login" })
            window.location.href = "/"
        }
    })
};

const checkUser = token => async dispatch => {
    dispatch(checkUserAction());
    await getDetailWithJWTService(token).then(res => {
        if(res.status === "FAILED") {
            dispatch(checkUser)
            window.location.href = "/auth";
        } else {
            dispatch(checkUserSuccess(res.result));
        }
    })
}

const AuthThunk = {
    login,
    checkUser
};

export default AuthThunk;