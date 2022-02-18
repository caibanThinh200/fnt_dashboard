class AttributeResponse {
    constructor(data) {
        this.setData(data);
    }

     setData(data) {
        this.id = data._id || "";
        this.name = data.name || "";
        this.code = data.code || "";
        this.types = data.types || [];
        this.status = data?.status || 1;
        this.unit = data.unit || "";
        this.require = data?.require || "";
        this.filter = data?.filter || "";
        this.created_at = data.created_at || null;
        this.updated_at = data.updated_at || null
    }
}

export const ACCESSORY_CONSTANT = {
    labelCols: ["name", "code", "unit", "created_at", "updated_at"],
    filterTypeOption: [
        { label: 'Ô Radio', value: 1 },
        { label: 'Ô Checkbox', value: 2 },
        { label: 'Thanh lựa chọn', value: 3 },
        { label: 'Thanh lựa chọn nhiều giá trị', value: 4 },
        { label: 'Thanh nhập liệu', value: 5 },
        { label: 'Ô màu sắc', value: 6 },
    ],
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

export default AttributeResponse;