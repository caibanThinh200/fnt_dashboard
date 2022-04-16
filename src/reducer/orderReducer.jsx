import { createReducer } from "@reduxjs/toolkit"
import orderAction from "../action/orderAction"

const initialState = {
    isOrderFetching: false,
    result: [],
    item: {},
    all: [],
    isSubmit: false,
    isUpdate: false,
    total: 0,
    revenue: {
        contacts: 0,
        approve: 0,
        cancel: 0,
        total: 0
    },
    page_index: 1,
    page_size: 5,
    page_count: 1
}

export default createReducer(initialState, reducer => {
    reducer
        .addCase(orderAction.checkoutAction, (state, action) => ({
            ...state,
            isOrderFetching: true
        }))
        .addCase(orderAction.checkoutSuccess, (state, action) => ({
            ...state,
            isOrderFetching: false,
            item: action.payload || {}
        }))
        .addCase(orderAction.checkoutFailed, () => initialState)
        .addCase(orderAction.paymentAction, (state, action) => ({
            ...state,
            isOrderFetching: false
        }))
        .addCase(orderAction.paymentSuccess, (state, action) => ({
            ...state,
            isOrderFetching: false,
            item: action.payload || {}
        }))
        .addCase(orderAction.paymentFailed, () => initialState)
        .addCase(orderAction.getDetailAction, (state, action) => ({
            ...state,
            isOrderFetching: true
        }))
        .addCase(orderAction.getDetailSuccess, (state, action) => ({
            ...state,
            isOrderFetching: false,
            item: action?.payload || {}
        }))
        .addCase(orderAction.getDetailFailed, () => initialState)
        .addCase(orderAction.getListAction, state => ({
            ...state,
            isOrderFetching: true
        }))
        .addCase(orderAction.getListSuccess, (state, action) => ({
            ...state,
            isOrderFetching: false,
            result: action.payload.result,
            total: action.payload.total,
            page_size: action.payload.page_size,
            page_index: action.payload.page_index
        }))
        .addCase(orderAction.getListFailed, () => initialState)
        .addCase(orderAction.getRevenueAction, state => ({
            ...state,
            isOrderFetching: true
        }))
        .addCase(orderAction.getRevenueSuccess, (state, action) => ({
            ...state,
            isOrderFetching: false,
            revenue: action.payload
        }))
        .addCase(orderAction.updateOrderStatusAction, state => ({
            ...state,
            isOrderFetching: true
        }))
        .addCase(orderAction.updateOrderStatusSuccess, state => ({
            ...state,
            isOrderFetching: false
        }))
        .addCase(orderAction.updateOrderStatusFailed, () => initialState)
        .addCase(orderAction.getRevenueFailed, () => initialState)
        .addCase(orderAction.clearOrderAction, () => initialState)
});