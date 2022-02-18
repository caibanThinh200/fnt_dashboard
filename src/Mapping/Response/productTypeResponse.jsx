import INFO_DEFINE from '../../Constant/infoDefine';
import AccessoryResponse from './attributeResponse';
import ProductResponse from './productResponse';
import { getThumbsUrl } from "../../Util/function"

class ProductTypeResponse {
    constructor(data) {
        this.setData(data);
    }

     setData(data) {
        this.id = data?._id || "";
        this.name = data?.name || "";
        this.type = data?.type || "";
        this.code = data?.code || "";
        this.status = data?.status || 1;
        this.attributes = (data?.attributes || []).length > 0 ? (data?.attributes || []).map(item => new AccessoryResponse(item)) : [];
        this.products = (data?.products || []).length > 0 ? (data?.products || []).map(item => new ProductResponse(item)) : [];
        this.filter = data?.filter || {};
        this.thumb = getThumbsUrl(data?.thumb)
        this.created_at = data?.created_at || null;
        this.updated_at = data?.updated_at || null;
    }


}

export const PRODUCT_TYPE_CONSTANT = {
    labelCols: ["name", "type", "status", "created_at", "updated_at"],
    approveStatus: {
        init: {
            title: "Khởi tạo",
            value: 0
        },
        approve: {
            title: "Đã phê duyệt",
            value: 1
        },
        unapprove: {
            title: "Đã từ chối phê duyệt",
            value: 2
        }
    },
    productTypeStatus: [
        {
            title: "Chưa kích hoạt",
            value: 0,
            color: "#808080"
        },
        {
            title: "Khởi tạo",
            value: 1,
            color: "#108ee9"
        },
        {
            title: "Đã duyệt",
            value: 2,
            color: "#87d068"
        },
        {
            title: "Đã hủy",
            value: 3,
            color: "#FF0000"
        }
    ]
}

export default ProductTypeResponse;