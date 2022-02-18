import {createReducer} from "@reduxjs/toolkit"
import { 
    registerAction, 
    loginAction, 
    registerActionSuccess, 
    loginActionSuccess, 
    logoutActionSuccess, 
    logoutAction, 
    checkUserAction, 
    checkUserSuccess, 
    registerActionFailed,
    loginActionFailed,
    logoutActionFailed,
    checkUserFailed
} from '../action/authAction';

const initialState  = {
    isSubmit: false,
    isAuthFetching: false,
    isRegisterFetching: false,
    info: null,
    isRegistered: false,
    isLogged: false,
    isAuthed: false
}

export default createReducer(initialState, reducer => {
    reducer
        .addCase(registerAction, (state, action) => ({...state, isRegisterFetching: true, isSubmit: true}))
        .addCase(loginAction, (state, action) => ({...state, isAuthFetching: true, isSubmit: true}))
        .addCase(logoutAction, (state, action) => ({...state, isAuthFetching:true, isSubmit: true}))
        .addCase(checkUserAction, (state, action) => ({...state, isAuthFetching: true}))
        .addCase(registerActionSuccess, (state, action) => ({...state, isRegisterFetching: false, isSubmit: false, isRegistered: true}))
        .addCase(loginActionSuccess, (state, action) => ({...state, isAuthFetching: false, isSubmit: false, isLogged: true}))
        .addCase(logoutActionSuccess, (state, action) => ({...state, isAuthFetching: false, isSubmit: false, isLogged: false, isRegistered: false, info: null}))
        .addCase(checkUserSuccess, (state, action) => ({...state, isAuthFetching: false, isAuthed: true, isSubmit: false, isLogged: true, isRegistered: false, info: (action).payload}))
        .addCase(registerActionFailed, (state, action) => initialState)
        .addCase(loginActionFailed, (state, action) => initialState)
        .addCase(logoutActionFailed, (state, action) => initialState)
        .addCase(checkUserFailed, (state, action) => initialState)
});