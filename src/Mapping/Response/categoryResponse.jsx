import INFO_DEFINE from "../../Constant/infoDefine";
import ProductTypeResponse from "./productTypeResponse";

export default class CategoryResponse {
    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.id = data?._id || "";
        this.name = data?.name || "";
        this.code = data?.code || "";
        this.status = data?.status || 1;
        this.productTypes = (data?.productTypes || []).length > 0 ? (data?.productTypes || []).map(item => new ProductTypeResponse(item)) : [];
        this.products = (data?.products || []).length > 0 ? (data?.products || []).map(item => new ProductTypeResponse(item)) : [];
        this.thumb = this.getThumbsUrl(data?.thumb);
        this.created_at = data?.created_at || "";
        this.updated_at = data?.updated_at || "";
    }

    getThumbsUrl(thumb = {}) {
        return (Object.keys(thumb)).length > 0 && [
            {
                ...thumb,
                url: thumb.url
            }
        ] || []; 
    }
}

export const CATEGORY_CONSTANT = {
    STATUS_DEFINE: [
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
    ],
}