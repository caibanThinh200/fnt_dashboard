export default class AuthRequest {
    username;
    password;
    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.username = data.username || "";
        this.password = data.password || "";
    }
}