import { message } from 'antd';
import UploadAction from '../action/uploadAction';
import { uploadService } from "../Service/uploadService";
import UploadRequest from "../Mapping/Request/uploadRequest";
import UploadResponse from '../Mapping/Response/uploadResponse';

const upload = (data) => {
    return async dispatch => {
        dispatch(UploadAction.uploadFileAction());
        const requestPayload = new UploadRequest(data).getFormData();
        return await uploadService(requestPayload)
            .then(res => {
                dispatch(UploadAction.uploadFileSuccess({item: res.result}));
                if (res.status === "FAILED") {
                    message.error("Đã có lỗi xảy ra");
                    dispatch(UploadAction.uploadFileFailed());
                } else {
                    message.success("Upload file thành công");
                    return res.result?.filename;
                    // window.history.back();
                }
            })
            .catch(e => {
                console.log(e);
                message.error("Đã có lỗi xảy ra");
                dispatch(UploadAction.uploadFileFailed());
            });
    }
};

const uploadThunk = {
    upload
}

export default uploadThunk;