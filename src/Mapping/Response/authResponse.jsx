export default class AuthResponse {
    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.id = data._id || "";
        this.name = data.name || "";
        this.username = data.username || "";
        this.password = data.password || "";
        this.email = data.email || "";
        this.phone = data.phone || "";
        this.address = data.address || "";
        this.gender = data.gender || 0;
        this.accessToken = data.accessToken || ""; 
        this.permission = data?.permission || [];
        this.role = data?.role || "";
        this.created_at = data.created_at || "";
        this.updated_at = data.updated_at || "";
    }
}