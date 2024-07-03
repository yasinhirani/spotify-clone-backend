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
const getSpotifyAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.post("https://accounts.spotify.com/api/token", {
        grant_type: "client_credentials",
        client_id: "fe25bbed2ffe4b83be86f915af4ed742",
        client_secret: "9eeafb1b036d482bad2ae541e6dab984",
    }, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    return res.data.access_token;
});
exports.default = getSpotifyAccessToken;
