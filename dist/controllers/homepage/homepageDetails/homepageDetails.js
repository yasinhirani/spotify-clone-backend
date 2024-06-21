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
const popularArtists_1 = __importDefault(require("../../../data/popularArtists"));
const popularAlbums_1 = __importDefault(require("../../../data/popularAlbums"));
const popularRadios_1 = __importDefault(require("../../../data/popularRadios"));
const featuredCharts_1 = __importDefault(require("../../../data/featuredCharts"));
const getPopularArtists = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        success: true,
        message: "",
        data: popularArtists_1.default,
    });
}));
exports.getPopularArtists = getPopularArtists;
const getPopularAlbums = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        success: true,
        message: "",
        data: popularAlbums_1.default,
    });
}));
exports.getPopularAlbums = getPopularAlbums;
const getPopularRadios = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        success: true,
        message: "",
        data: popularRadios_1.default,
    });
}));
exports.getPopularRadios = getPopularRadios;
const getFeaturedCharts = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        success: true,
        message: "",
        data: featuredCharts_1.default,
    });
}));
exports.getFeaturedCharts = getFeaturedCharts;
