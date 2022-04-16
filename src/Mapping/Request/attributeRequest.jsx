class AttributeRequest {
    constructor(data) {
        this.setData(data);
    } 

    setData(data) {
        this.name = data?.name || "";
        this.unit = data?.unit || "";
        this.require = data?.require || false;
        this.required_field = data?.required_field || false;
        this.value_type = data?.value_type || 2;
        this.status = data?.status || 1;
        this.filter = data?.filter || {};
    }
}

export default AttributeRequest;