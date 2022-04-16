import ProductResponse from "./productResponse";

export default class OrderResponse {
    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.id = data?._id || ""
        this.code = data?.code || "";
        this.contact = this.getContact(data?.contact);
        this.orders = (data?.orders || []).length > 0 && (data?.orders || []).map(order => new ProductResponse({ ...order?.product, quantity: order?.quantity })) || [];
        this.status = data?.status || 1;
        this.cost = this.getCost(data?.cost);
        this.payment = data?.payment || 1;
        this.totalOrder = data?.cost?.totalOrder || 0;
        this.VATCost = data?.cost?.VATCost || 0;
        this.ship = data?.cost?.ship || 0;
        this.totalCost = data?.cost?.totalCost || 0;
        this.approve_contacts = data?.contacts || 0;
        this.name = data?.contact?.name || "";
        this.email = data?.contact?.email || "";
        this.phone = data?.contact?.phone || "";
        this.address = data?.contact?.address || "";
        this.note = data?.contact?.note || "";
        this.province = data?.contact?.province || "";
        this.district = data?.contact?.district || "";
        this.ward = data?.contact?.ward || "";
        this.approve_order = data?.approve || 0;
        this.total_revenue = data?.total || 0;
        this.cancel_order = data?.cancel || 0
        this.created_at = data?.created_at || "";
        this.updated_at = data?.updated_at || "";
    }

    getCost(cost) {
        return {
            totalOrder: cost?.totalOrder || 0,
            VATCost: cost?.VATCost || 0,
            ship: cost?.ship || 0,
            totalCost: cost?.totalCost || 0
        }
    }

    getContact(contact) {
        return {
            name: contact?.name || "",
            email: contact?.email || "",
            phone: contact?.phone || "",
            address: contact?.address || "",
            note: contact?.note || "",
            province: contact?.province || "",
            district: contact?.district || "",
            ward: contact?.ward || "",
        }
    }
}

export const ORDER_CONSTANT = {
    status: [
        {
            title: "Khởi tạo",
            value: 1,
            color: "#108ee9"
        },
        {
            title: "Chờ duyệt",
            value: 2,
            color: "#808080"
        },
        {
            title: "Đã duyệt",
            value: 3,
            color: "#87d068"
        },
        {
            title: "Đã hủy",
            value: 4,
            color: "#FF0000"
        }
    ]
}