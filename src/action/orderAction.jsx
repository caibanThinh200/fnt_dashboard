import { createAction } from "@reduxjs/toolkit";
import orderTypes from "../Constant/Types/orderType";

const orderAction = {
    checkoutAction: createAction(orderTypes.CHECKOUT_ORDER_ACTION),
    checkoutSuccess: createAction(orderTypes.CHECKOUT_ORDER_SUCCESS, order => ({ payload: order })),
    checkoutFailed: createAction(orderTypes.CHECKOUT_ORDER_FAILED),
    paymentAction: createAction(orderTypes.PAYMENT_ORDER_ACTION),
    paymentSuccess: createAction(orderTypes.PAYMENT_ORDER_SUCCESS, payment => ({ payload: payment })),
    paymentFailed: createAction(orderTypes.PAYMENT_ORDER_FAILED),
    getDetailAction: createAction(orderTypes.GET_ORDER_DETAIL_ACTION),
    getDetailSuccess: createAction(orderTypes.GET_ORDER_DETAIL_SUCCESS, order => ({ payload: order })),
    getDetailFailed: createAction(orderTypes.GET_ORDER_DETAIL_FAILED),
    getListAction: createAction(orderTypes.GET_LIST_ODER_ACTION),
    getListSuccess: createAction(orderTypes.GET_LIST_ODER_SUCCESS, orders => ({ payload: orders })),
    getListFailed: createAction(orderTypes.GET_LIST_ODER_FAILED),
    getRevenueAction: createAction(orderTypes.GET_ORDER_REVENUE_ACTION),
    getRevenueSuccess: createAction(orderTypes.GET_ORDER_REVENUE_SUCCESS, revenue => ({ payload: revenue })),
    getRevenueFailed: createAction(orderTypes.GET_ORDER_REVENUE_FAILED),
    updateOrderStatusAction: createAction(orderTypes.UPDATE_ORDER_STATUS_ACTION),
    updateOrderStatusSuccess: createAction(orderTypes.UPDATE_ORDER_STATUS_SUCCESS),
    updateOrderStatusFailed: createAction(orderTypes.UPDATE_ORDER_STATUS_FAILED),
    clearOrderAction: createAction(orderTypes.CLEAR_ORDER_ACTION)
}

export default orderAction;