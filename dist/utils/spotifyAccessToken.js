"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpotifyAccessToken {
    constructor(token) {
        this.token = token !== null && token !== void 0 ? token : "";
    }
    getToken() {
        return this.token;
    }
    setToken(token) {
        this.token = token;
    }
}
exports.default = SpotifyAccessToken;
