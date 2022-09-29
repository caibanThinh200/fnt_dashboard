import { createAction } from "@reduxjs/toolkit";
import Types from "../Constant/Types/newTypes";

const newAction = {
    createNewAction: createAction(Types.CREATE_NEW_ACTION, (data) => ({ payload: data || {} })),
    getListNewAction: createAction(Types.GET_LIST_NEW_ACTION, (data) => ({ payload: data || {} })),
    getListAllNewAction: createAction(Types.GET_LIST_ALL_NEW_ACTION),
    getDetailNewAction: createAction(Types.GET_DETAIL_NEW_ACTION, (id) => ({ payload: id || {} })),
    updateNewAction: createAction(Types.UPDATE_NEW_ACTION, (id, data) => ({ payload: { ...data, params: id } })),
    createNewSuccess: createAction(Types.CREATE_NEW_SUCCESS, (data) => ({ payload: data || {} })),
    getListNewSuccess: createAction(Types.GET_LIST_NEW_SUCCESS),
    getListAllNewSuccess: createAction(Types.GET_LIST_ALL_NEW_SUCCESS, (data) => ({ payload: data || {} })),
    getDetailNewSuccess: createAction(Types.GET_DETAIL_NEW_SUCCESS, (id) => ({ payload: id || {} })),
    updateNewSuccess: createAction(Types.UPDATE_NEW_SUCCESS, (id, data) => ({ payload: { ...data, params: id } })),
    createNewFailed: createAction(Types.CREATE_NEW_FAILED),
    getListNewFailed: createAction(Types.GET_LIST_NEW_FAILED),
    getListAllNewFailed: createAction(Types.GET_LIST_ALL_NEW_FAILED),
    getDetailNewFailed: createAction(Types.GET_DETAIL_NEW_FAILED),
    updateNewFailed: createAction(Types.UPDATE_NEW_FAILED),
    clearNewAction: createAction(Types.CLEAR_NEW_ACTION)
}

export default newAction;

