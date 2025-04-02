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
const axios_1 = __importDefault(require("axios"));
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
    const response = yield axios_1.default.get(`${process.env.GET_SONG_URL}?p=1&q=${query}&_format=json&_marker=0&api_version=4&ctx=web6dot0&n=20&__call=search.getResults`);
    const songsData = response.data.results.map((result) => {
        var _a, _b, _c;
        return ({
            artists: {
                primary: (_b = (_a = result === null || result === void 0 ? void 0 : result.more_info) === null || _a === void 0 ? void 0 : _a.artistMap) === null || _b === void 0 ? void 0 : _b.primary_artists
            },
            downloadUrl: (0, createDownloadURL_1.createDownloadLinks)((_c = result === null || result === void 0 ? void 0 : result.more_info) === null || _c === void 0 ? void 0 : _c.encrypted_media_url)
        });
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
