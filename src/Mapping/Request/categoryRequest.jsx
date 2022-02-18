export default class CategoryRequest {
    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.name = data?.name || "";
        this.status = data?.status || 1;
        this.code = data?.code || ""
        this.thumb = (data?.thumb || []).length > 0 && {...data?.thumb[0], url: data?.thumb[0]?.response?.url ? data?.thumb[0]?.response?.url : data.thumb[0]?.url} || {};
    }

    getThumbUrl(thumb = []) {
        return thumb.length > 0 && thumb[0] || {};
    }
}