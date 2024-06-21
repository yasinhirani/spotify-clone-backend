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
exports.getFeaturedCharts = exports.getPopularRadios = exports.getPopularAlbums = exports.getPopularArtists = void 0;
const asyncHandler_1 = __importDefault(require("../../../utils/asyncHandler"));
const fs_1 = __importDefault(require("fs"));
const getPopularArtists = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const popularArtists = yield fs_1.default.promises.readFile("json/popularArtists.json", { encoding: "utf-8" });
    res.status(200).json({
        success: true,
        message: "",
        data: JSON.parse(popularArtists),
    });
}));
exports.getPopularArtists = getPopularArtists;
const getPopularAlbums = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const popularAlbums = yield fs_1.default.promises.readFile("json/popularAlbums.json", { encoding: "utf-8" });
    res.status(200).json({
        success: true,
        message: "",
        data: JSON.parse(popularAlbums),
    });
}));
exports.getPopularAlbums = getPopularAlbums;
const getPopularRadios = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const popularRadios = yield fs_1.default.promises.readFile("json/popularRadios.json", { encoding: "utf-8" });
    res.status(200).json({
        success: true,
        message: "",
        data: JSON.parse(popularRadios),
    });
}));
exports.getPopularRadios = getPopularRadios;
const getFeaturedCharts = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const featuredCharts = yield fs_1.default.promises.readFile("json/featuredCharts.json", { encoding: "utf-8" });
    res.status(200).json({
        success: true,
        message: "",
        data: JSON.parse(featuredCharts),
    });
}));
exports.getFeaturedCharts = getFeaturedCharts;
