import { message } from 'antd';
import {
    createProductAction,
    createProductFailed,
    createProductSuccess,
    getDetailProductAction,
    getDetailProductFailed,
    getDetailProductSuccess,
    getListProductAction,
    getListProductFailed,
    getListProductSuccess,
    updateProductAction,
    updateProductSuccess,
    updateProductFailed,
    clearProductAction
} from '../action/productAction';
import {
    createService,
    getDetailService,
    getListService,
    updateService
} from "../Service/productService";
import ProductRequest from "../Mapping/Request/productRequest";

const create = (data) => {
    return async dispatch => {
        dispatch(createProductAction());
        const requestPayload = new ProductRequest(data);
        await createService(requestPayload)
            .then(res => {
                dispatch(createProductSuccess());
                if (res.data.status === "FAILED") {
                    console.log(res.error);
                    message.error("Đã có lỗi xảy ra");
                    dispatch(createProductFailed());
                } else {
                    message.success("Tạo sản phẩm thành công");
                    data.navigate("/product");
                    // window.history.back();
                }
            })
            .catch(e => {
                message.error("Đã có lỗi xảy ra");
                dispatch(createProductFailed());
            });
    }
};

const getList = (filter) => {
    return async dispatch => {
        dispatch(getListProductAction());
        const res = await getListService(filter)
        if (res.status === "FAILED") {
            console.log(res.error);
            message.error("Đã có lỗi xảy ra");
            dispatch(getListProductFailed());
        } else {
            dispatch(getListProductSuccess(res))
            // window.history.back();
        }
    }
}

const getDetail = (id, isUpdate = false) => {
    return async dispatch => {
        dispatch(getDetailProductAction());
        const res = await getDetailService(id);
        if (res.status === "FAILED") {
            console.log(res.error);
            message.error("Đã có lỗi xảy ra");
            dispatch(getDetailProductFailed());
        } else {
            dispatch(getDetailProductSuccess(res?.result))
        }
    }
}

const update = (id, data) => {
    return async dispatch => {
        dispatch(updateProductAction());
        const requestPayload = new ProductRequest(data);
        const res = await updateService(id, requestPayload);
        if (res.status === "FAILED") {
            message.error("Đã có lỗi xảy ra");
            dispatch(updateProductFailed());
        } else {
            dispatch(updateProductSuccess(res))
            dispatch(getDetailProductAction());
            await getDetailService(id).then(resDetail => {
                if (resDetail.status === "FAILED") {
                    console.log(resDetail.error);
                    message.error("Đã có lỗi xảy ra");
                    dispatch(getDetailProductFailed());
                } else {
                    dispatch(getDetailProductSuccess(resDetail?.result))
                    // window.history.back();
                }
                message.success("Cập nhật sản phẩm thành công")
            });
        }
    }
}

const clearProduct = () => {
    return dispatch => {
        dispatch(clearProductAction());
    }
}

const productThunk = {
    create,
    getList,
    getDetail,
    update,
    clearProduct
}

export default productThunk;