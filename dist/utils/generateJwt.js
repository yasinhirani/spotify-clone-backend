"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJsonWebTokenEmail = exports.generateJsonWebToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJsonWebToken = (email, userId) => {
    const token = jsonwebtoken_1.default.sign({ email, userId: userId !== null && userId !== void 0 ? userId : 0 }, process.env.ACCESS_TOKEN_SECRET);
    return token;
};
exports.generateJsonWebToken = generateJsonWebToken;
const generateJsonWebTokenEmail = (email) => {
    const token = jsonwebtoken_1.default.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5 min",
    });
    return token;
};
exports.generateJsonWebTokenEmail = generateJsonWebTokenEmail;
