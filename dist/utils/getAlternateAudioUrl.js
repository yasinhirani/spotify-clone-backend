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
exports.getAlternateAudioUrl = getAlternateAudioUrl;
const axios_1 = __importDefault(require("axios"));
function getAlternateAudioUrl(songName, artist) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = encodeURIComponent(`${songName} ${artist} official audio`);
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${process.env.YOUTUBE_API_KEY}&maxResults=1&type=video`;
        const response = yield axios_1.default.get(url);
        if (response.data.items.length === 0)
            return null;
        const alternateUrl = yield axios_1.default.get(`https://youtube-mp36.p.rapidapi.com/dl?id=${response.data.items[0].id.videoId}`, {
            headers: {
                "x-rapidapi-key": process.env.RAPID_API_KEY,
                "x-rapidapi-host": process.env.RAPID_API_HOST,
            },
        });
        return alternateUrl.data.link;
    });
}
