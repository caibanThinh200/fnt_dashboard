import { message } from "antd";
import ProductTypeAction from "../action/productTypeAction";
import { getListAllService, getDetailService, getListService, updateService, createService } from "../Service/productTypeService";
import ProductTypeRequest from "../Mapping/Request/productTypeRequest";

const create = data => async dispatch => {
    dispatch(ProductTypeAction.createProductTypeAction());
    const requestPayload = new ProductTypeRequest(data);
    await createService(requestPayload).then(res => {
        if (res.status === "FAILED") {
            message.error("Đã có lỗi xảy ra");
            dispatch(ProductTypeAction.createProductTypeFailed());
        } else {
            dispatch(ProductTypeAction.createProductTypeSuccess());
            data.navigate("/product-type");
            message.success("Thêm loại sản phẩm thành công")
        }
    })
}

const getListAll = () => {
    return async dispatch => {
        dispatch(ProductTypeAction.getListAllProductTypeAction());
        const result = await getListAllService()
            .then(res => {
                if (res.status === "FAILED") {
                    message.error("Đã có lỗi xảy ra");
                    dispatch(ProductTypeAction.getListAllProductTypeFailed());
                } else {
                    dispatch(ProductTypeAction.getListAllProductTypeSuccess({ result: res?.result || [] }))
                }
            })
            .catch(e => {
                console.log(e);
                message.error("Đã có lỗi xảy ra");
                dispatch(ProductTypeAction.getListAllProductTypeFailed());
            })
    }
}

const getList = filter => async dispatch => {
    dispatch(ProductTypeAction.getListProductTypeAction());
    const result = await getListService(filter);
    if (result.status === "FAILED") {
        message.error("Đã có lỗi xảy ra");
        dispatch(ProductTypeAction.getListProductTypeFailed());
    } else {
        dispatch(ProductTypeAction.getListProductTypeSuccess({ result: result?.result || [] }))
    }
}

const getDetail = (id, isUpdate = false) => {
    return async dispatch => {
        dispatch(ProductTypeAction.getDetailProductTypeAction());
        await getDetailService(id)
            .then(res => {
                if (res.status === "FALIED") {
                    message.error("Đã có lỗi xảy ra");
                    dispatch(ProductTypeAction.getDetailProductTypeFailed());
                } else {
                    dispatch(ProductTypeAction.getDetailProductTypeSuccess({ item: res.result, isUpdate }));
                }
            })
            .catch(e => {
                console.log(e);
                message.error("Đã có lỗi xảy ra");
                dispatch(ProductTypeAction.getDetailProductTypeFailed());
            })
    }
}

const update = (id, data) => async dispatch => {
    dispatch(ProductTypeAction.updateProductTypeAction());
    const requestPayload = new ProductTypeRequest(data);
    console.log(requestPayload)
    const res = await updateService(id, requestPayload);
    if (res.status === "FAILED") {
        message.error("Đã có lỗi xảy ra");
        dispatch(ProductTypeAction.updateProductTypeFailed());
    } else {
        dispatch(ProductTypeAction.updateProductTypeSuccess(res))
        dispatch(ProductTypeAction.getDetailProductTypeAction());
        await getDetailService(id).then(resDetail => {
            if (resDetail.status === "FAILED") {
                console.log(resDetail.error);
                message.error("Đã có lỗi xảy ra");
                dispatch(ProductTypeAction.getDetailProductTypeFailed());
            } else {
                dispatch(ProductTypeAction.getDetailProductTypeSuccess({item: resDetail.result}))
                // window.history.back();
            }
            message.success("Cập nhật sản phẩm thành công")
        });
    }
}

const onClear = () => {
    return dispatch => {
        dispatch(ProductTypeAction.clearProductTypeAction());
    }
}


const ProductTypeThunk = {
    create,
    getListAll,
    getDetail,
    onClear,
    getList,
    update
}

export default ProductTypeThunk;