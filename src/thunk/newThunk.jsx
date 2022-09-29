import { message } from 'antd'
import newAction from '../action/newAction'
import NewRequest from '../Mapping/Request/newRequest'
import {
    createService,
    getDetailService,
    getListAllService,
    getListService,
    updateService,
} from '../Service/newService'

const getListAll = () => async (dispatch) => {
    dispatch(newAction.getListAllNewAction())
    const result = await getListAllService()
    if (result.status === 'FAILED') {
        message.error('Đã có lỗi xảy ra')
        dispatch(newAction.getListAllNewFailed())
    } else {
        dispatch(newAction.getListAllNewSuccess(result))
    }
}

const getList = (filter) => async (dispatch) => {
    dispatch(newAction.getListNewAction())
    const result = await getListService(filter)
    if (result.status === 'FAILED') {
        message.error('Đã có lỗi xảy ra')
        dispatch(newAction.getListNewFailed())
    } else {
        dispatch(newAction.getListNewSuccess(result))
    }
}

const create = (data) => async (dispatch) => {
    dispatch(newAction.createNewAction())
    const requestPayload = new NewRequest(data)
    const result = await createService(requestPayload)
    if (result.status === 'FAILED') {
        message.error('Đã có lỗi xảy ra')
        dispatch(newAction.createNewFailed())
    } else {
        dispatch(newAction.createNewSuccess())
        data.navigate('/new')
        message.success('Thêm bảng tin thành công')
    }
}

const getDetail = (id) => async (dispatch) => {
    dispatch(newAction.getDetailNewAction())
    const result = await getDetailService(id)
    // console.log(result)
    if (result.status === 'FAILED') {
        message.error('Đã có lỗi xảy ra')
        dispatch(newAction.getDetailNewFailed())
    } else {
        dispatch(newAction.getDetailNewSuccess(result.result))
    }
}

const update = (id, data) => async (dispatch) => {
    dispatch(newAction.updateNewAction())
    const requestPayload = new NewRequest(data)
    const result = await updateService(id, requestPayload)
    if (result.status === 'FAILED') {
        message.error('Đã có lỗi xảy ra')
        dispatch(newAction.updateNewFailed())
    } else {
        dispatch(newAction.updateNewSuccess())
        dispatch(newAction.getDetailNewAction())
        const res = await getDetailService(id)
        if (res.status === 'FAILED') {
            message.error('Đã có lỗi xảy ra')
            dispatch(newAction.getDetailNewFailed())
        } else {
            dispatch(newAction.getDetailNewSuccess(res.result))
            message.success('Cập nhật bảng tin thành công')
        }
    }
}

const clear = () => async (dispatch) => {
    dispatch(newAction.clearNewAction())
}

const NewThunk = {
    getListAll,
    getList,
    create,
    update,
    getDetail,
    clear,
}

export default NewThunk
