import Types from "../Constant/Types/userType";
import {createAction} from "@reduxjs/toolkit"

export const registerAction = createAction(Types.REGISTER_ACTION, (data) => ({payload: data || {}}));
export const loginAction = createAction(Types.LOGIN_ACTION, (data) => ({payload: data || {}}));
export const logoutAction = createAction(Types.LOGOUT_ACTION);
export const checkUserAction = createAction(Types.CHECK_USER_ACTION, (data) => ({payload: data || {}}))
export const registerActionSuccess = createAction(Types.REGISTER_SUCCESS, (data) => ({payload: data || {}}));
export const loginActionSuccess = createAction(Types.LOGIN_SUCCESS, (data) => ({payload: data || {}}));
export const logoutActionSuccess = createAction(Types.LOGOUT_SUCCESS);
export const checkUserSuccess = createAction(Types.CHECK_USER_SUCCESS, user => ({payload: user}));
export const registerActionFailed = createAction(Types.REGISTER_FAILED);
export const loginActionFailed = createAction(Types.LOGIN_FAILED);
export const logoutActionFailed = createAction(Types.LOGOUT_FAILED);
export const checkUserFailed = createAction(Types.CHECK_USER_FAILED);