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
exports.search = void 0;
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const axiosInstance_1 = __importDefault(require("../../utils/axiosInstance"));
const apiResponse_1 = __importDefault(require("../../utils/apiResponse"));
const search = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    const response = yield axiosInstance_1.default.get(`/v1/search?q=${query}&type=album,track,artist,playlist&limit=10&offset=0`);
    res.status(200).json(new apiResponse_1.default({ result: response.data }));
}));
exports.search = search;
