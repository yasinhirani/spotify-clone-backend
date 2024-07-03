"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const spotifyAccessToken_1 = __importDefault(require("./spotifyAccessToken"));
const getSpotifyAccessToken_1 = __importDefault(require("./getSpotifyAccessToken"));
const axiosInstance = axios_1.default.create({
    baseURL: "https://api.spotify.com",
});
const spotifyToken = new spotifyAccessToken_1.default();
axiosInstance.interceptors.request.use((req) => __awaiter(void 0, void 0, void 0, function* () {
    let token = spotifyToken.getToken();
    if (!token) {
        token = yield (0, getSpotifyAccessToken_1.default)();
        spotifyToken.setToken(token);
    }
    req.headers.Authorization = `Bearer ${spotifyToken.getToken()}`;
    return req;
}));
axiosInstance.interceptors.response.use((res) => res, (error) => __awaiter(void 0, void 0, void 0, function* () {
    const originalRequest = error.config;
    if (error.response.status === 401) {
        const token = yield (0, getSpotifyAccessToken_1.default)();
        spotifyToken.setToken(token);
        return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
}));
exports.default = axiosInstance;
