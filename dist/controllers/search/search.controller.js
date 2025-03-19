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
exports.getAlternateUrl = exports.searchSong = exports.search = void 0;
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const axiosInstance_1 = __importDefault(require("../../utils/axiosInstance"));
const apiResponse_1 = __importDefault(require("../../utils/apiResponse"));
const createDownloadURL_1 = require("../../utils/createDownloadURL");
const getAlternateAudioUrl_1 = require("../../utils/getAlternateAudioUrl");
const search = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    const response = yield axiosInstance_1.default.get(`/v1/search?q=${query}&type=album,track,artist,playlist&limit=10&offset=0`);
    res.status(200).json(new apiResponse_1.default({ result: response.data }));
}));
exports.search = search;
const searchSong = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    const langs = "hindi,english";
    const response = yield fetch(`https://www.jiosaavn.com/api.php?__call=search.getResults&_format=json&_marker=0&api_version=4&ctx=web6dot0&q=${query}&p=0&n=10`, {
        headers: {
            cookie: `L=${langs}; gdpr_acceptance=true; DL=english`,
        },
    });
    const data = yield response.json();
    const songsData = data.results.map((songData) => {
        var _a, _b;
        return {
            downloadUrl: (0, createDownloadURL_1.createDownloadLinks)((_a = songData.more_info) === null || _a === void 0 ? void 0 : _a.encrypted_media_url),
            artists: {
                primary: (_b = songData.more_info) === null || _b === void 0 ? void 0 : _b.artistMap.primary_artists
            }
        };
    });
    res.status(200).json(new apiResponse_1.default({ results: songsData }));
}));
exports.searchSong = searchSong;
const getAlternateUrl = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { songName, artistName } = req.query;
    const alternateUrl = yield (0, getAlternateAudioUrl_1.getAlternateAudioUrl)(songName, artistName);
    res.status(200).json(new apiResponse_1.default({ url: alternateUrl }));
}));
exports.getAlternateUrl = getAlternateUrl;
