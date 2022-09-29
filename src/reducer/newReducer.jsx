import { createReducer } from "@reduxjs/toolkit";
import ActionType from "../action/newAction";

const initialState = {
    isNewFetching: false,
    result: [],
    item: {},
    all: [],
    isSubmit: false,
    isUpdate: false,
    total: 0,
    page_index: 1,
    page_size: 5,
    page_count: 1
}

export default createReducer(initialState, reducer => {
    reducer
        .addCase(ActionType.createNewAction, (state, action) => ({...state, isNewFetching: true}))
        .addCase(ActionType.getListNewAction, (state, action) => ({...state, isNewFetching: true}))
        .addCase(ActionType.getListAllNewAction, (state, action) => ({...state, isNewFetching: true}))
        .addCase(ActionType.getDetailNewAction, (state, action) => ({...state, isNewFetching: true}))
        .addCase(ActionType.updateNewAction, (state, action) => ({...state, isNewFetching: true}))
        .addCase(ActionType.createNewSuccess, (state, action) => ({...state, isNewFetching: false}))
        .addCase(ActionType.getListNewSuccess, (state, action) => ({...state, isNewFetching: false, ...(action).payload}))
        .addCase(ActionType.getListAllNewSuccess, (state, action) => ({...state, isNewFetching: false, ...(action).payload, all: (action).payload?.result, result: []}))
        .addCase(ActionType.getDetailNewSuccess, (state, action) => ({...state, isNewFetching: false, item: (action).payload}))
        .addCase(ActionType.updateNewSuccess, (state, action) => ({...state, isNewFetching: false}))
        .addCase(ActionType.clearNewAction, () => initialState)
})