import { message } from "antd";
import { pick } from "lodash";
import orderAction from "../action/orderAction";
import INFO_DEFINE from "../Constant/infoDefine";
import OrderRequest from "../Mapping/Request/orderRequest";
import { checkoutOrderService, getDetailService, getListOrderService, getRevenueService, paymentService, updateStatusService } from "../Service/orderService";

const checkout = data => async dispatch => {
    const requestPayload = new OrderRequest(data);
    dispatch(orderAction.checkoutAction());
    await checkoutOrderService(requestPayload).then(res => {
        if (res.status === "FAILED") {
            dispatch(orderAction.checkoutFailed());
        } else {
            dispatch(orderAction.checkoutSuccess(res.result));
        }
    })
}

const payment = (id, data, navigate) => async dispatch => {
    const requestPayload = new OrderRequest(data);
    dispatch(orderAction.paymentAction());
    await paymentService(id, requestPayload).then(res => {
        if (res.status === "FAILED") {
            dispatch(orderAction.paymentFailed())
        } else {
            dispatch(orderAction.paymentSuccess(res.result));
            dispatch(orderAction.clearOrderAction())
            message.success("Thanh toán đơn hàng thành công");
        }
    });
    navigate("/checkout/" + id);
}

const getDetail = (id, navigate) => async dispatch => {
    dispatch(orderAction.getDetailAction());
    const orderResult = await getDetailService(id);
    if (orderResult?.status === "FAILED") {
        dispatch(orderAction.getDetailFailed());
        navigate("/not-found");
    } else {
        if (Object.keys(orderResult?.result || {}).length < 1) {
            navigate("/not-found");
        } else {
            dispatch(orderAction.getDetailSuccess(orderResult?.result));
        }
    }
}

const getList = filter => async dispatch => {
    dispatch(orderAction.getListAction());
    const orderResult = await getListOrderService(filter);
    if (orderResult.status === "FAILED") {
        dispatch(orderAction.getListFailed());
        message.error("Đã có lỗi xảy ra");
    } else {
        dispatch(orderAction.getListSuccess({
            result: orderResult.result,
            page_index: orderResult.page_index,
            page_size: orderResult.page_size,
            total: orderResult.total
        }))
    }
}

const getRevenue = () => async dispatch => {
    dispatch(orderAction.getListAction());
    const orderResult = await getRevenueService();
    if (orderResult.status === "FAILED") {
        dispatch(orderAction.getRevenueFailed());
        message.error("Đã có lỗi xảy ra");
    } else {
        dispatch(orderAction.getRevenueSuccess(pick(orderResult.result, ["approve_contacts", "approve_order", "total_revenue", "cancel_order"])))
    }
}

const updateStatus = (id, data) => async dispatch => {
    dispatch(orderAction.updateOrderStatusAction());
    const requestPayload = pick(new OrderRequest(data), ["status"]);
    await updateStatusService(id, requestPayload).then(res => {
        if(res.status === "FAILED") {
            dispatch(orderAction.updateOrderStatusFailed());
            message.error("Đã có lỗi xảy ra");
        } else {
            dispatch(orderAction.updateOrderStatusSuccess());
            dispatch(orderAction.clearOrderAction())
            getList(INFO_DEFINE.page_default)(dispatch)
        }
    })
}

const OrderThunk = {
    checkout,
    payment,
    getDetail,
    getList,
    getRevenue,
    updateStatus
}

export default OrderThunk;