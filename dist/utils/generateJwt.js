"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJsonWebToken = (email) => {
    const token = jsonwebtoken_1.default.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5 min" });
    return token;
};
exports.default = generateJsonWebToken;
